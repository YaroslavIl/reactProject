
import "./App.css";
import MainComp from "./MainComp";
import { Routes, Route, useSearchParams } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import Sliderr from "./components/Sliderr";
import Register from "./components/Register";
import Login from "./components/Login";


function App() {

  
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Sliderr />} />
        <Route path="/main" element={<UserInfo />} />
        <Route path="/shop" element={<MainComp />} />
        <Route path="/home" element={<Sliderr />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
} 

export default App;
