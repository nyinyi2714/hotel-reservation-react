import React, { useState, useEffect, useRef } from "react";
import StayForm from "../../components/StayForm/StayForm";
import "./RoomsPage.css";

export default function RoomsPage(props) {
  const states = props.states;

  return(
    <div className="rooms-page">
      <StayForm states={states} />
      <div className="rooms-page__rooms-gallery">

      </div>
    </div>
  );
}