import React, { useEffect, useState } from "react";
import Complaint from "./Complaint";
import axios from "axios";
import { Link } from "react-router-dom";

const Complaints = ({ id }: any) => {
  const [catagory, setCatagory] = useState("All Queries");
  const [complaints, setComplaints] = useState([
    { id: "", complaint: "", catagory: "" },
  ]);
  const [visibleComplaints, setVisibleComplaints] = useState([
    { id: "", complaint: "", catagory: "" },
  ]);
  const getComplaints = async () => {
    const response = await axios.post(
      "http://localhost:5000/complaint/getAllComplaintsById",
      { userId: id },
      { withCredentials: true }
    );
    const tempComplaint: any[] = [];
    response.data.complaints.conversations.map((comp: any) => {
      const htmlString = comp.source.body;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const jsonContent = doc.body.firstChild?.textContent;
      try {
        if (jsonContent) {
          const parsed = JSON.parse(jsonContent);
          const complaintInstance = {
            id: comp.id,
            complaint: parsed.comments,
            catagory: parsed.catagory,
          };
          tempComplaint.push(complaintInstance);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      setComplaints(tempComplaint);
      setVisibleComplaints(tempComplaint);
    });
  };
  useEffect(() => {
    getComplaints();
  }, [id]);

  return (
    <div className="complaints">
      <h2 className="text-center text-4xl font-bold">Complaints</h2>
      <select
        className="catagorySelector"
        value={catagory}
        onChange={(e) => {
          if (e.target.value == "All Queries") {
            setVisibleComplaints(complaints);
          } else {
            const tempComplaints = complaints.filter((complaint: any) => {
              return complaint.catagory == e.target.value;
            });
            setVisibleComplaints(tempComplaints);
            setCatagory(e.target.value);
          }
        }}
      >
        <option value="All Queries">All Queries</option>
        <option value="General Queries">General Queries</option>
        <option value="Product Features Queries">
          Product Features Queries
        </option>
        <option value="Product Pricing Queries">Product Pricing Queries</option>
        <option value="Product Feature Implementation Requests">
          Product Feature Implementation Requests
        </option>
      </select>
      <Link to={`/addcomplaint/${id}`}>
        <button className="newComplaints rounded-2xl">New Complaint</button>
      </Link>
      {visibleComplaints.map((complaint) => {
        return (
          <Link to={`/${complaint.id}`}>
            <div className="complaint" key={complaint.id}>
              <ul>
                <li>id: {complaint.id}</li>
                <li>Category: {complaint.catagory}</li>
                <li>Comments: {complaint.complaint}</li>
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Complaints;
