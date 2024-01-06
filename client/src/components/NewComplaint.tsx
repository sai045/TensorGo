import axios from "axios";
import React, { useState } from "react";

const NewComplaint = () => {
  const [userId, setUderId] = useState("");
  const [catagory, setCategory] = useState("General Queries");
  const [comments, setComments] = useState("");
  const submitHandler = async (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/complaint/createComplaint", {
        userId,
        comments,
        catagory,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="employeeSide">
        <form className="detailsForm" onSubmit={submitHandler}>
          <h2 className="text-2xl">Create Complaint Form</h2>
          <input
            type="text"
            placeholder="Employee ID"
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
