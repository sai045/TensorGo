import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const handle = () => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((response) => {
        setName(response.data.displayName);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handle();
  }, []);
  return <div>{name}</div>;
};

export default Profile;
