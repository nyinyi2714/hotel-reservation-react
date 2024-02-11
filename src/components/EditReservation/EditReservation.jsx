import React, { useState, useEffect } from "react";

import { StayForm } from "../index";
import { useBackend } from "../../hooks";

import { useStateContext } from "../../StateContext";
import "./EditReservation.css";

/**
 * EditReservation component for modifying and updating reservations.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since August 18th 2023
 * @param {Object} props - The props containing necessary functions and data.
 * @returns {JSX.Element} The JSX element for editing reservations.
 */
function EditReservation(props) {
  const { closeEditModal, reservation, handleFetchReservations, convertDateObjectToDate } = props;
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    guestNum,
    setGuestNum,
    resetState
  } = useStateContext();

  const { updateReservation, deleteReservation } = useBackend();

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
  function convertDateToObject(date) {
    if (!(date instanceof Date)) {
      throw new Error('Input is not a valid Date object');
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, add 1
    const day = date.getDate();

    return { year, month, day };
  }

  /**
 * Saves the changes made to the reservation.
 * Updates the reservation details via an API call.
 * @returns {void}
 */
  const saveChanges = async () => {
    const newReservationData = {
      reservationId: reservation._id,
      checkinDate: convertDateToObject(startDate),
      checkoutDate: convertDateToObject(endDate),
      numOfGuests: guestNum,
      roomType: selectedRoomType,
    };

    const isReqSuccessful = await updateReservation(newReservationData);
    if (isReqSuccessful) {
      console.log("modify successfully")
      closeEditModal();
      // reset states in StateContext.jsx
      resetState();
      // update reversations list from backend
      handleFetchReservations();
    }
  };

  /**
 * Deletes the reservation by updating its status.
 * @returns {void}
 */
  const handleDeleteReservation = async () => {
    const isReqSuccessful = await deleteReservation(reservation._id);

    if (isReqSuccessful) {
      console.log("deleted successfully");
      closeEditModal();
      // reset states in StateContext.jsx
      resetState();
      // update reversations list from backend
      handleFetchReservations();
    }
  };

  useEffect(() => {
    setStartDate(convertDateObjectToDate(reservation.checkinDate));
    setEndDate(convertDateObjectToDate(reservation.checkoutDate));
    setGuestNum(reservation.numOfGuests);
    setSelectedRoomType(reservation.roomType);
  }, []);

  return (
    <div className="edit-reservation-wrapper">
      <div className="edit-reservation-modal">
        <h2>Modifying Your Reservation</h2>
        <StayForm isModifying={true} reservation={reservation} convertDateObjectToDate={convertDateObjectToDate} />
        <div className="edit-reservation__flexbox">
          <label htmlFor="room-type">Room Type: </label>
          <select
            id="room-type"
            name="room-type"
            onChange={handleRoomTypeChange}
            value={selectedRoomType}
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
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
            onClick={handleDeleteReservation}
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