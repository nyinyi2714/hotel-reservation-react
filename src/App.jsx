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
import { StateProvider } from "./StateContext";
import "./App.css";

export default function App() {
  const { getUser } = useAuth();
  const [userData, setUserData] = useState({ authenticated: false });

  useEffect(() => {
    getUser().then(userData => setUserData(userData));
  }, []);

  const refreshUserData = () => {
    getUser().then(userData => setUserData(userData));
  };

  return (
    <div className="app">
      <StateProvider>
        <>
          <Navbar userData={userData} setUserData={setUserData} />
          <Routes>
            <Route exact path="/" element={<HomePage  refreshUserData={refreshUserData} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/rooms" element={<RoomsPage />}  />
            <Route path="/reservation/new" element={<NewReservation />} />
            <Route path="/reservations" element={<ManageReservation />} />
          </Routes>
          <Footer/>
        </>
      </StateProvider>
    </div>
  );
}
