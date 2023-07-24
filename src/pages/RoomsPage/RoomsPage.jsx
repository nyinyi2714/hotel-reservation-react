import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StayForm from "../../components/StayForm/StayForm";
import RoomContainer from "../../components/RoomContainer/RoomContainer";
import "./RoomsPage.css";

export default function RoomsPage(props) {
  return(
    <div className="rooms-page">
      <StayForm states={props.states} />
      <div className="rooms-page__rooms-gallery">
        <RoomContainer />
        <Link to="/reservation/new">New</Link>
      </div>
    </div>
  );
}