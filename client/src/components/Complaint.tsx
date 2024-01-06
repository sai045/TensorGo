import React, { useEffect } from "react";

const Complaint = () => {
  const complaint = {
    type: "conversation",
    id: "10",
    created_at: 1704512404,
    updated_at: 1704512405,
    waiting_since: 1704512405,
    snoozed_until: null,
    source: {
      type: "conversation",
      id: "1995588781",
      delivered_as: "customer_initiated",
      subject: "",
      body: '<p>{"comments":"complaint","catagory":"H"}</p>',
      author: {
        type: "user",
        id: "6597fc9828740179e18f3506",
        name: "Karnataka Pics",
        email: "picskarnataka@gmail.com",
      },
    },
    open: true,
  };
  const htmlString = '<p>{"comments":"complaint","catagory":"H"}</p>';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Extract JSON content from the <p> tag
  const jsonContent = doc.body.firstChild?.textContent;

  // Parse the JSON content
  try {
    if (jsonContent) {
      const parsedData = JSON.parse(jsonContent);
      console.log(parsedData);
    }
    // setJsonData(parsedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  useEffect(() => {});
  return (
    <div>
      <ul></ul>
    </div>
  );
};

export default Complaint;
