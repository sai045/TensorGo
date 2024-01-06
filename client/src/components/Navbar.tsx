import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface NavbarProps {
  email: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ email }: any) => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .then((response) => {})
      .catch((err) => console.log(err));
    window.location.href = "http://localhost:3000/";
  };

  return (
    <>
      <div className="bg-gray-800 h-24">
        <div className="absolute inset-y-0 left-0 h-24 py-6 px-12 flex">
          <img src={logo} alt="" height="50px" width="50px" />
          <h4 className="text-white text-2xl px-4 py-2">
            Customer Servive Portal
          </h4>
        </div>
        <div className="absolute inset-y-0 right-0 h-16 py-4 px-12">
          {email ? (
            <button onClick={handleLogout}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
                className="rounded-full"
                height="50px"
                width="50px"
              />
            </button>
          ) : (
            <button onClick={handleLogin}>
              <h3 className="text-2xl text-white px-4 py-3">Login</h3>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
