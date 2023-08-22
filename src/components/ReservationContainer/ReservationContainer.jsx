import React, { useRef } from "react";
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
  const { openRoomModal, openEditModal, reservation, convertStringToDateObj } = props;

  const daysOfWeek = useRef([
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ]);
  const monthsOfYear = useRef([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]);

  /**
 * Checks if the start and end dates have the same year.
 * @returns {boolean} True if the start and end dates have the same year, otherwise false.
 */
  const sameStartYearAndEndYear = (startDate, endDate) => {
    return startDate.getFullYear() == endDate.getFullYear();
  }; 

  /**
 * Returns the abbreviated day of the week (e.g., "Mon").
 * @param {Date} date - The input date.
 * @returns {string} The abbreviated day of the week.
 */
  const getDay = (date) => {
    return daysOfWeek.current[date.getDay()];
  };

  /**
 * Returns the abbreviated month of the year (e.g., "Jan").
 * @param {Date} date - The input date.
 * @returns {string} The abbreviated month of the year.
 */
  const getMonth = (date) => {
    return monthsOfYear.current[date.getMonth()];
  };

  /**
 * Generates a formatted date string.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {string} The formatted date string.
 */
  const generateDate = (startDate, endDate) => {
    let displayBothYear = !sameStartYearAndEndYear(startDate, endDate);
    let string = getDay(startDate) + ", " 
      + getMonth(startDate) + " " 
      + startDate.getDate()
      + (displayBothYear ? ", " : " ")
      + (displayBothYear ? startDate.getFullYear() : "")
      + " — " + getDay(endDate) + ", " 
      + getMonth(endDate) + " " 
      + endDate.getDate() + ", "
      + endDate.getFullYear() + " ";
    return string;
  };

  return (
    <div className="reservation-container">
      <span>Booking ID</span>
      <span>Room Type</span>
      <span>Cost</span>
      <span>Guest Count</span>
      <span>Booking Date</span>
      <button 
        type="button" 
        className="btn reservation-container__btn"
        id={reservation.reservation_id}
        onClick={openEditModal}
      >
        Edit
      </button>
      <span>#{reservation.reservation_id}</span>
      <span>{reservation.room_details.name}</span>
      <span>${reservation.total_price.toFixed(2)}</span>
      <span>{reservation.number_of_guest} Person{reservation.number_of_guest > 1 && "s"}</span>
      <span>
        {reservation && generateDate(
          convertStringToDateObj(reservation.date_of_occupancy),
          convertStringToDateObj(reservation.date_of_departure)
        )}
      </span>
      <button
        type="button"
        className="btn reservation-container__btn"
        onClick={openRoomModal}
        id={reservation.reservation_id}
      >
        View Room
      </button>
    </div>
  );
}

export default ReservationContainer;