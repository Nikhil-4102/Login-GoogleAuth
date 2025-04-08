import "./App.css";
import React, { use } from "react";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";

import { ToastContainer } from "react-toastify";
import { auth } from "./components/firebase";

function App() {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
     setUser(user);
    });
    
  });

  return (
    <Router>
      <div className="">
         <div className="auth-Wrapper">
           <div className="auth-inner">
            <Routes>
              <Route path="/" element={user?<Navigate to="profile"/> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
    
            </Routes>
            <ToastContainer/>
          </div>
         </div>
      </div>
    </Router>
  );
}

export default App;
