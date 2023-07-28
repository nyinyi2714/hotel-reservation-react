import React from "react";
import "./ReservationContainer.css";

export default function ReservationContainer(props) {
  const { openRoomModal } = props;

  return (
    <div className="reservation-container">
      <span>Booking ID</span>
      <span>Room Type</span>
      <span>Guest Count</span>
      <span>Bed Count</span>
      <span>Booking Date</span>
      <button 
        type="button" 
        className="btn reservation-container__btn"
      >
        Edit
      </button>
      <span>#129383838</span>
      <span>Queen Bed Standard</span>
      <span>2 Persons</span>
      <span>2 Beds</span>
      <span>Oct 12th — Oct 19th, 2023</span>
      <button
        type="button"
        className="btn reservation-container__btn"
        onClick={openRoomModal}
      >
        View Room
      </button>
    </div>
  );
}