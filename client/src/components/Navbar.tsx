import React from "react";
import logo from "./logo.png";

const Navbar: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
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
          <button onClick={handleLogin}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className="rounded-full"
              height="50px"
              width="50px"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
