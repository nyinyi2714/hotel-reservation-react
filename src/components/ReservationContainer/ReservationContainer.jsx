import React from "react";
import "./ReservationContainer.css";

/**
 * Renders a container for displaying reservation information.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 24th 2023
 * @param {Object} props - The component props.
 * @param {Function} props.openRoomModal - Function to open the room modal.
 * @param {Function} props.openEditModal - Function to open the edit modal.
 * @returns {JSX.Element} The rendered ReservationContainer component.
 */
function ReservationContainer(props) {
  const { openRoomModal, openEditModal } = props;

  return (
    <div className="reservation-container">
      <span>Booking ID</span>
      <span>Room Type</span>
      <span>Cost</span>
      <span>Guest Count</span>
      <span>Bed Count</span>
      <span>Booking Date</span>
      <button 
        type="button" 
        className="btn reservation-container__btn"
        onClick={openEditModal}
      >
        Edit
      </button>
      <span>#129383838</span>
      <span>Standard</span>
      <span>$283.96</span>
      <span>2 Persons</span>
      {<span>2 Beds</span>}
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

export default ReservationContainer;