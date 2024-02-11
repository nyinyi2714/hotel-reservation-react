import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage, ManageReservation, NewReservation, SignIn, SignUp, RoomsPage } from "./pages";
import { Navbar, Footer } from "./components";
import { useAuth } from "./hooks";

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
