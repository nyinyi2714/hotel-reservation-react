import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NewReservation from "./pages/NewReservation/NewReservation";
import ManageReservation from "./pages/ManageReservation/ManageReservation";
import Popup from "./components/Popup/Popup";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { StateProvider } from "./StateContext";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <StateProvider>
        <>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/rooms" element={<RoomsPage />}  />
            <Route path="/reservation/new" element={<NewReservation />} />
            <Route path="/reservations" element={<ManageReservation />} />
            <Route path="/popup" element={<Popup />} />
          </Routes>
          <Footer/>
        </>
      </StateProvider>
    </div>
  );
}
