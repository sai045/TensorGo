import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";
import Home from "./pages/Home";
import "./App.css";
import Complaint from "./components/Complaint";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:complaint" element={<Complaint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
