import React from "react";
import "./App.css";
import "./styles/tailwind.css";

const App: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">My React App with Tailwind CSS</h1>
      <p className="mt-2">Welcome to my app!</p>
    </div>
  );
};

export default App;
