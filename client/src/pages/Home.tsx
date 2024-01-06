import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Login from "../components/Login";
import Complaints from "../components/Complaints";

const Home: React.FC = () => {
  const [user, setUser] = useState({ id: "", name: "" });
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    if (email) {
      const getData = async () => {
        const respone = await axios.post("http://localhost:5000/auth/getUser", {
          email,
        });
        const responseUser = respone.data.existingUser.data[0];
        setUser(responseUser);
      };
      getData();
    }
  }, []);

  return (
    <>
      <Navbar name={user.name} email={email} />
      {email ? (
        <>
          <Complaints id={user?.id} />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Home;
