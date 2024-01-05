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

  const logout = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((response) => {})
      .catch((err) => console.log(err));
    window.location.href = "http://localhost:3000/";
  };
  useEffect(() => {
    handle();
  }, []);
  return (
    <div>
      {name}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
