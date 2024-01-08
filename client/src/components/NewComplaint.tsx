import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const NewComplaint = () => {
  const { id } = useParams();
  const [userId, setUderId] = useState(id);
  const [catagory, setCategory] = useState("General Queries");
  const [comments, setComments] = useState("");
  const [user, setUser] = useState({ name: "", email: "" });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/complaint/createComplaint",
        {
          userId,
          comments,
          catagory,
        },
        { withCredentials: true }
      )
      .then((response: any) => {})
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const respone = await axios.post(
        "http://localhost:5000/auth/getUserById",
        {
          id,
        }
      );
      const responseUser = respone.data.existingUser;
      setUser(responseUser);
      console.log(responseUser);
    };
    if (id) {
      getData();
    }
  }, [id]);
  console.log(user);
  return (
    <>
      <Navbar name={user.name} email={user.email} />
      <div className="employeeSide">
        <form className="detailsForm" onSubmit={submitHandler}>
          <h2 className="text-2xl">Create Complaint Form</h2>

          <input
            type="text"
            placeholder="ID"
            value={userId}
            onChange={(e) => {
              setUderId(e.target.value);
            }}
          />

          <br />
          <select
            value={catagory}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="Product Features Queries">
              Product Features Queries
            </option>
            <option value="Product Pricing Queries">
              Product Pricing Queries
            </option>
            <option value="Product Feature Implementation Requests">
              Product Feature Implementation Requests
            </option>
            <option value="General Queries"> General Queries</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Description"
            required
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default NewComplaint;
