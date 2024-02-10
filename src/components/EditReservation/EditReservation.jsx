import React, { useState, useEffect } from "react";
import StayForm from "../StayForm/StayForm";
import { useStateContext } from "../../StateContext";
import { BACKEND_API } from "../../config";
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
  const { closeEditModal, reservation, fetchReservations, convertDateObjectToDate } = props;
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
 * Computes the total price of a reservation based on room type, number of nights, and guest count.
 * @param {string} roomType - The selected room type (e.g., "standard", "deluxe", "suite").
 * @returns {number} The calculated total price for the reservation.
 */
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
    if (guestNum > 2) totalPrice += (4 - guestNum) * additionalFee;
    totalPrice += totalPrice * taxes;
    return totalPrice;
  }

  /**
 * Saves the changes made to the reservation.
 * Updates the reservation details via an API call.
 * @returns {void}
 */
  const saveChanges = async () => {
    const requestData = {
      reservationId: reservation._id,
      checkinDate: convertDateToObject(startDate),
      checkoutDate: convertDateToObject(endDate),
      numOfGuests: guestNum,
      roomType: selectedRoomType,
    };

    try {
      const response = await fetch(`${BACKEND_API}/reservation/update`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
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
 * @returns {void}
 */
  const deleteReservation = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/reservation/delete`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationId: reservation._id })
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