import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NewReservation from "./pages/NewReservation/NewReservation";
import ManageReservation from "./pages/ManageReservation/ManageReservation";
import useAuth from "./hooks/useAuth";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./App.css";

export default function App() {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="app">
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/reservation/new" element={<NewReservation />} />
          <Route path="/reservations" element={<ManageReservation />} />
        </Routes>
        <Footer />
      </>
    </div >
  );
}
