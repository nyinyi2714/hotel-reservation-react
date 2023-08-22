import React, { useState, useEffect } from "react";
import StayForm from "../StayForm/StayForm";
import { useStateContext } from "../../StateContext";
import { backendUrl } from "../../config";
import "./EditReservation.css";

function EditReservation(props) {
  const { closeEditModal, reservation, fetchReservations, convertStringToDateObj } = props;
  const { 
    startDate, 
    setStartDate,
    endDate, 
    setEndDate,
    guestNum, 
    setGuestNum,
    accessToken, 
    resetState 
  } = useStateContext();
  // TODO: access reservation.roomType from props
  const [selectedRoomType, setSelectedRoomType] = useState("standard");
  const roomIds = {
    "standard": 1,
    "deluxe": 2,
    "suite": 3,
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
  };

  /**
 * Cancels the changes made and resets the state to its initial values.
 * Also closes the edit modal.
 * @returns {void}
 */
  const cancelChanges = () => {
    resetState();
    closeEditModal();
  };

  /**
 * Converts a given date to an object containing its components.
 *
 * @param {Date} date - The input date object.
 * @returns {Object} An object containing the date's components: date, month, and year.
 */
// TODO: documentation
function convertDateToObject(date) {
  if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object');
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, add 1
  const day = date.getDate();

  return { year, month, day };
}

const computeTotalPrice = (roomType) => {
  const roomPrice = {
    standard: 150,
    deluxe: 250,
    suite: 350,
  };
  const taxes = 0.13;
  const additionalFee = 25;
  const numOfNight = endDate.getDate() - startDate.getDate();
  let totalPrice = roomPrice[roomType] * numOfNight;
  if(guestNum > 2) totalPrice += (4 - guestNum ) * additionalFee;
  totalPrice += totalPrice * taxes;
  return totalPrice;
}

  /**
 * Saves the changes made to the reservation.
 * Updates the reservation details via an API call.
 * Also handles resetting states and fetching updated reservations.
 * @returns {void}
 */
  const saveChanges = async () => {
    const requestData = {
      date_of_occupancy: convertDateToObject(startDate),
      date_of_departure: convertDateToObject(endDate),
      number_of_guest: guestNum,
      room_id: roomIds[selectedRoomType],
      total_price: computeTotalPrice(selectedRoomType)
    };

    try {
      const response = await fetch(`${backendUrl}/update/userReservation/${reservation.reservation_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("modify successfully")
        closeEditModal();
      } else {
        alert(responseData.error);
        console.error("Reservation modification failed:", responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error);
    }

    // reset states in StateContext.jsx
    resetState();
    // update reversations list from backend
    fetchReservations();
  };

  /**
 * Deletes the reservation by updating its status.
 * Also handles resetting states and fetching updated reservations.
 *
 * @returns {void}
 */
  const deleteReservation = async () => {
    try {
      const response = await fetch(`${backendUrl}/update/userReservation/${reservation.reservation_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ is_active: "false" }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("deleted successfully");
        closeEditModal();
      } else {
        console.error("Reservation Deletion failed:", responseData.error);
        alert(responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error);
    }

    // reset states in StateContext.jsx
    resetState();
    // update reversations list from backend
    fetchReservations();
  };

  useEffect(() => {
    setStartDate(convertStringToDateObj(reservation.date_of_occupancy));
    setEndDate(convertStringToDateObj(reservation.date_of_departure));
    setGuestNum(reservation.number_of_guest);
    setSelectedRoomType(reservation.room_details.name.toLowerCase());
  }, []);

  return (
    <div className="edit-reservation-wrapper">
      <div className="edit-reservation-modal">
        <h2>Modifying Your Reservation</h2>
        <StayForm isModifying={true} reservation={reservation} convertStringToDateObj={convertStringToDateObj} />
        <div className="edit-reservation__flexbox">
          <label htmlFor="room-type">Room Type: </label>
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
            onClick={deleteReservation}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn edit-reservation__btn btn--default"
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