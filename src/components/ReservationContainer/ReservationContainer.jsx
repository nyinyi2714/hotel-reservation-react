import React, { useRef } from "react";
import "./ReservationContainer.css";

/**
 * Renders a container for displaying reservation information.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 24th 2023
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered ReservationContainer component.
 */
function ReservationContainer(props) {
  const { openRoomModal, openEditModal, reservation, convertDateObjectToDate } = props;

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
      <span className="table-title title1">Room Type</span>
      <span className="table-title title2">Cost</span>
      <span className="table-title title3">Guest Count</span>
      <span className="table-title title4">Dates</span>
      <button 
        type="button" 
        className="btn reservation-container__btn btn1"
        id={reservation._id}
        onClick={openEditModal}
      >
        Edit
      </button>
      <span className="item1" data-title="Room Type">{reservation.roomType}</span>
      <span className="item2" data-title="Price">${reservation.price.toFixed(2)}</span>
      <span className="item3" data-title="Guests">{reservation.numOfGuests} Person{reservation.numOfGuests > 1 && "s"}</span>
      <span className="item4" data-title="Dates">
        {reservation && generateDate(
          convertDateObjectToDate(reservation.checkinDate),
          convertDateObjectToDate(reservation.checkoutDate)
        )}
      </span>
      <button
        type="button"
        className="btn reservation-container__btn btn2"
        onClick={openRoomModal}
        id={reservation._id}
      >
        View Room
      </button>
    </div>
  );
}

export default ReservationContainer;