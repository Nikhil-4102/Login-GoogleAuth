import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="">
         <div className="auth-Wrapper">
           <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
    
            </Routes>
            <ToastContainer/>
          </div>
         </div>
      </div>
    </Router>
  );
}

export default App;
