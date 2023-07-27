import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/Signup";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Navbar from "./components/Navbar";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NewReservation from "./pages/NewReservation/NewReservation";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./App.css";

export default function App() {
  const initializeEndDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(initializeEndDate());
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
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rooms" element={<RoomsPage states={states} />}  />
        <Route path="/reservation/new" element={<NewReservation states={states} />} />
      </Routes>
    </div>
  );
}
