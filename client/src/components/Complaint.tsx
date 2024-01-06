import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const textparser = (data: any) => {
  const htmlString = data;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const jsonContent = doc.body.firstChild?.textContent;
  try {
    if (jsonContent) {
      const parsed = JSON.parse(jsonContent);
      return parsed;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
};
const Complaint = () => {
  const { complaint } = useParams();
  const [messages, setMessages] = useState([{}]);
  const [firstMessage, setFirstMessage] = useState({
    catagory: "",
    comments: "",
    name: "",
    email: "",
  });
  const getComplaint = async () => {
    axios
      .post("http://localhost:5000/complaint/getComplaint", {
        id: complaint,
      })
      .then((response: any) => {
        console.log(response.data.response.source.author);
        const tempMessages: any[] = [];
        const { comments, catagory } = textparser(
          response.data.response.source.body
        );
        setFirstMessage({
          name: response.data.response.source.author.name,
          comments,
          catagory,
          email: response.data.response.source.author.email,
        });
        const m = response.data.response.conversation_parts.conversation_parts;
        m.shift();
        m.map((conversation: any) => {
          var body = conversation.body;
          body = body.slice(21, -4);
          tempMessages.push({
            type: conversation.author.type,
            message: body,
          });
        });
        setMessages(tempMessages);
      });
  };
  console.log(firstMessage);
  useEffect(() => {
    getComplaint();
  }, []);
  console.log(messages);
  return (
    <>
      <Navbar name={firstMessage.name} email={firstMessage.email} />
      <div className="messages rounded-2xl">
        <div className="header">
          <div>
            <h2 className="text-2xl">Conversation with {firstMessage.name}</h2>
            <p>Category: {firstMessage.catagory}</p>
          </div>
        </div>
        <div className="px-6">
          <div className="firstMessage my-6">
            <p>{firstMessage.name}</p>
            <h2>{firstMessage.comments}</h2>
          </div>
          <div className="my-6 w-32">
            {messages.map((message: any) => {
              return (
                <>
                  <div className="my-6">
                    <h2>{message.type}</h2>
                    <p>{message.message}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaint;
