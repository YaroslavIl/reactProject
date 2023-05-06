
import "./App.css";
import MainComp from "./MainComp";
import { Routes, Route, useSearchParams } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import Sliderr from "./components/Sliderr";


function App() {

  
  return (
    <div className="main">
      {/* <MainSlider /> */}
      {/* <Sliderr/> */}
      <Routes>
        <Route path="/" element={<MainComp />} />
        <Route path="/main" element={<UserInfo />} />
        <Route path="/shop" element={<MainComp />} />
        <Route path="/home" element={<Sliderr />} />
      </Routes>
    </div>
  );
} 

export default App;
