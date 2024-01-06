import React, { useEffect, useState } from "react";
import Complaint from "./Complaint";
import axios from "axios";
import { Link } from "react-router-dom";

const Complaints = ({ id }: any) => {
  const [counter, setCounter] = useState(0);
  const [complaints, setComplaints] = useState([
    { id: "", complaint: "", catagory: "" },
  ]);
  const getComplaints = async () => {
    const response = await axios.post(
      "http://localhost:5000/complaint/getAllComplaintsById",
      { userId: id }
    );
    const tempComplaint: any[] = [];
    response.data.complaints.conversations.map((comp: any) => {
      console.log(comp);
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
    });
  };
  useEffect(() => {
    getComplaints();
  }, [id]);

  return (
    <div className="complaints">
      <h2 className="text-center text-4xl font-bold">Complaints</h2>
      <Link to="/addcomplaint">
        <button className="newComplaints rounded-2xl">New Complaint</button>
      </Link>
      {complaints.map((complaint) => {
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
