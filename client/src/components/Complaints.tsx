import React, { useEffect, useState } from "react";
import Complaint from "./Complaint";
import axios from "axios";

const Complaints = ({ id }: any) => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const getComplaints = async () => {
      const response = await axios.post(
        "http://localhost:5000/complaint/getAllComplaintsById",
        { id }
      );
      console.log(response);
    };
    getComplaints();
  }, []);
  return <div></div>;
};

export default Complaints;
