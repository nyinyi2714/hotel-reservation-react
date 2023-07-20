import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "./App.css";

export default function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guestNum, setGuestNum] = useState(1);

  const states = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    guestNum,
    setGuestNum,
  };
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rooms" element={<RoomsPage states={states} />}  />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
