import React, { useEffect, useState } from "react";
import Complaint from "./Complaint";
import axios from "axios";
import { complaints } from "../complaints";

const Complaints = ({ id }: any) => {
  // console.log(complaints.complaints.conversations[0]);
  console.log(id);
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const getComplaints = async () => {
      const response = await axios.post(
        "http://localhost:5000/complaint/getAllComplaintsById",
        { userId: id }
      );
      console.log(response.data.complaints);
    };
    getComplaints();
  }, []);
  const [parsedData, setParsedData] = useState({ catagory: "", comments: "" });
  // useEffect(() => {
  //   const htmlString = complaints.complaints.conversations[0].source.body;
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   // Extract JSON content from the <p> tag
  //   const jsonContent = doc.body.firstChild?.textContent;

  //   // Parse the JSON content
  //   try {
  //     if (jsonContent) {
  //       const parsed = JSON.parse(jsonContent);
  //       setParsedData(parsed);
  //       console.log(parsed);
  //     }
  //     // setJsonData(parsedData);
  //   } catch (error) {
  //     console.error("Error parsing JSON:", error);
  //   }
  // }, []);

  return (
    <div className="complaints">
      <div className="complaint">
        <ul>
          {/* <li>id: {complaints.complaints.conversations[0].id}</li> */}
          <li>Category: {parsedData.catagory}</li>
          <li>Comments: {parsedData.comments}</li>
        </ul>
      </div>
    </div>
  );
};

export default Complaints;
