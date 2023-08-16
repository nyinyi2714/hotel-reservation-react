import React, { useState } from "react";
import StayForm from "../StayForm/StayForm";
import { useStateContext } from "../../StateContext";
import { backendUrl } from "../../config";
import "./EditReservation.css";

function EditReservation(props) {
  const { closeEditModal, reservation, fetchReservations } = props;
  const { startDate, endDate, guestNum, accessToken, resetState } = useStateContext();
  // TODO: access reservation.roomType from props
  const [selectedRoomType, setSelectedRoomType] = useState("standard");

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
  };

  const cancelChanges = () => {
    resetState();
    closeEditModal();
  };

  const saveChanges = async () => {
    const requestData = {
      date_of_occupancy: startDate,
      date_of_departure: endDate,
      num_guests: guestNum,
      room_id: selectedRoomType,
      reservation_id: "", // TODO reservation.id
    };

    try {
      // TODO: change the url
      const response = await fetch(`${backendUrl}/modify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // TODO: display successful modification message
      } else {
        console.error("Reservation modification failed:", responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // reset states in StateContext.jsx
    resetState();
    // update reversations list from backend
    fetchReservations();
  };
  
  return (
    <div className="edit-reservation-wrapper">
      <div className="edit-reservation-modal">
        <h2>Modifying Your Reservation</h2>
        {/* TODO: pass reservation as props */}
        <StayForm isModifying={true} reservation={reservation} />
        <div className="edit-reservation__flexbox">
          <label for="room-type">Room Type: </label>
          <select 
            id="room-type"
            name="room-type"
            onChange={handleRoomTypeChange}
            value={selectedRoomType}
          >
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
          </select>
          <button
            type="button" 
            className="btn edit-reservation__btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>
          <button
            type="button" 
            className="btn edit-reservation__btn btn--red"
            onClick={cancelChanges}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditReservation;