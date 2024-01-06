import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

interface NavbarProps {
  name: string;
  email: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ email, name }: any) => {
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
        <Link to={`/?email=${email}`}>
          <div className="absolute inset-y-0 left-0 h-24 py-6 px-12 flex">
            <img src={logo} alt="" height="50px" width="50px" />
            <h4 className="text-white text-2xl px-4 py-2">
              Customer Servive Portal
            </h4>
          </div>
        </Link>
        <div className="absolute inset-y-0 right-0 h-16 py-4 px-12">
          {email ? (
            <button onClick={handleLogout}>
              <h3 className="text-2xl text-white px-4 py-3">{name}</h3>
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
