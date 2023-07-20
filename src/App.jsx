import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rooms" element={<RoomsPage />}  />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
