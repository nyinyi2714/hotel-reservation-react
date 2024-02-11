import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import useBackend from "../../hooks/useBackend";

import StayForm from "../../components/StayForm/StayForm";
import { useStateContext } from "../../StateContext";
import "./NewReservation.css";

/**
 * This component handles the reservation details and payment form.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since August 1st 2023
 * @returns {JSX.Element} The rendered NewReservation component.
 */
function NewReservation() {
  const { createNewReservation } = useBackend();

  // State variables for payment
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);

  const {
    startDate,
    endDate,
    roomType,
    guestNum,
    resetState,
  } = useStateContext();

  // State variables for reciept
  const [totalPrice, setTotalPrice] = useState(0);
  const [roomPrice, setRoomPrice] = useState(roomType.price);

  const successfulReservationMessage = "Your new reservation has been successfully created. Thank you!";
  const failedReservationMessage = "We are unable to process your request at the moment. Please try again later.";
  const [displayMessage, setDisplayMessage] = useState("");

  const handleCardNumber = (e) => {
    const inputNum = e.target.value;
    if (inputNum.length > 16) return
    setCardNumber(inputNum)
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    const inputYear = e.target.value;
    if (inputYear.length <= 4) setYear(inputYear);
    else setYear(inputYear.slice(0, 4));
  };

  /**
   * Validates the selected year of the card.
   * @returns {boolean} Whether the card's year is valid.
   */
  const validateYear = () => {
    const currentYear = new Date().getFullYear();
    const yearInput = parseInt(year, 10);
    const result = yearInput >= currentYear;
    setIsYearValid(result);
    return result;
  };

  /**
   * Validates the card number.
   * @returns {boolean} Whether the card number is valid.
   */
  const validateCardNumber = () => {
    let result = cardNumber.length === 16;
    setIsCardNumberValid(result);
    return result;
  };

  /**
   * Generates options for selecting the month.
   * @returns {JSX.Element[]} The rendered option elements.
   */
  const generateMonthOptions = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    let options;

    if (parseInt(year, 10) > currentYear) {
      // If selected year is greater than current year, show all months
      options = generateMonthOptionsHelper(1, 12);
    } else {
      // If selected year is same as current year, 
      // show current month to December
      options = generateMonthOptionsHelper(currentMonth, 12);
    }
    return options;
  }

  /**
   * Generates options for selecting the month (helper function).
   * @param {number} startMonth - The start month.
   * @param {number} endMonth - The end month.
   * @returns {JSX.Element[]} The rendered option elements.
   */
  function generateMonthOptionsHelper(startMonth, endMonth) {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const start = parseInt(startMonth, 10);
    const end = parseInt(endMonth, 10);
    const options = [];

    if (start <= end) {
      for (let month = start; month <= end; month++) {
        const value = month.toString().padStart(2, "0");
        const label = `${value} ${monthNames[month - 1]}`;
        options.push(<option key={value} value={value}>{label}</option>);
      }
    }

    return options;
  }

  useEffect(() => {
    if (isCardNumberValid) return;
    validateCardNumber();
  }, [cardNumber]);

  useEffect(() => {
    if (isYearValid) return;
    validateYear();
  }, [year]);

  /**
 * Handles the booking of the reservation.
 * Run all validation tests and if all pass, then it
 * sends an API request to book the reservation.
 * @returns {void}
 */
  const bookReservation = async () => {
    // Validate card number and year
    const isCardValid = validateCardNumber();
    const isYearValid = validateYear();

    // If card number or year is invalid, return early
    if (!isCardValid || !isYearValid) {
      return;
    }

    /**
   * Converts a JavaScript Date object to an object containing its components.
   * @param {Date} date - The input date object.
   * @throws {Error} Throws an error if the input is not a valid Date object.
   * @returns {Object} An object containing the date's components: year, month, and day.
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

    // Prepare reservation data
    const reservationData = {
      checkinDate: convertDateToObject(startDate),
      checkoutDate: convertDateToObject(endDate),
      numOfGuests: guestNum,
      roomType: roomType.roomType,
    };
    
    const isReqSuccessful = await createNewReservation(reservationData);

    if (isReqSuccessful) {
      setDisplayMessage(successfulReservationMessage);
      resetState();
    } else {
      setDisplayMessage(failedReservationMessage);
    }
};

  /**
 * Get the day date as a string with leading zero if less than 10.
 * @param {Date} d - The date object to extract the day from.
 * @returns {string} The formatted day date.
 */
  const getDate = (d) => {
    const date = d.getDate();
    return date < 9 ? "0" + date : date;
  }

  /**
 * Calculate the number of nights between two dates.
 * @param {Date} endDate - The end date.
 * @param {Date} startDate - The start date.
 * @returns {number} The number of nights between the dates.
 */
  const getNumOfNight = (endDate, startDate) => {
    return getDate(endDate) - getDate(startDate);
  };

  /**
 * Compute the total price of the room based on the number of nights.
 * @returns {void}
 */
  const computeRoomPrice = () => {
    const pricePerNight = roomType.price;
    let roomPrice = (pricePerNight * getNumOfNight(endDate, startDate));
    setRoomPrice(roomPrice);
  };

  useMemo(() => {
    computeRoomPrice();
    setTotalPrice((roomPrice));
  }, [startDate, endDate, roomType, guestNum, roomPrice]);

  return (
    <React.Fragment>
      <div className={`new-reservation__message ${displayMessage.length <= 0 && "hide"}`}>
        <span>
          <div className="margin-bottom">{displayMessage}</div>
          <div>
            Return to {" "}
            <Link to="/">Home</Link>
          </div>
        </span>
      </div>
      <div className={`new-reservation ${displayMessage.length > 0 && "hide"}`}>
        <StayForm />
        <div className="new-reservation__receipt">
          <h3 className="new-reservation__subheading">
            Step 2 of 2
          </h3>
          <h2 className="new-reservation__heading">
            Reservation Details
          </h2>

          <div className="new-reservation__table">
              <h3 className="new-reservation__total">Total for Stay</h3>
              <h3 className="new-reservation__total right-aligned">
                ${totalPrice.toFixed(2)}
              </h3>

              <span>{`1 King Bed ${roomType.roomType}`}</span>
              <span className="right-aligned">${roomPrice.toFixed(2)}</span>
          </div>

        </div>
        <div className={"new-reservation__payment"}>
          <h3>Payment</h3>
          <form>
            <div className="new-reservation__payment-input">
              <label htmlFor="card-number">Card Number</label>
              <input
                id="card-number"
                type="text"
                onChange={handleCardNumber}
                value={cardNumber}
                onBlur={validateCardNumber}
                className={isCardNumberValid
                  ? ""
                  : "new-reservation__invalid"
                }
              />
              <span
                className={isCardNumberValid
                  ? "new-reservation__err"
                  : "new-reservation__err show"
                }
              >
                <i className="bx bx-error-circle" />
                Please enter a valid card number.
              </span>
            </div>
            <div className="new-reservation__payment-input">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                name="month"
                onChange={handleMonth}
                value={month}
              >
                {generateMonthOptions()}
              </select>
            </div>
            <div className="new-reservation__payment-input">
              <label htmlFor="year">Year</label>
              <input
                id="year"
                type="number"
                onChange={handleYear}
                value={year}
                min={new Date().getFullYear()}
                onBlur={validateYear}
                className={isYearValid
                  ? ""
                  : "new-reservation__invalid"
                }
              />
              <span
                className={isYearValid
                  ? "new-reservation__err"
                  : "new-reservation__err show"
                }
              >
                <i className="bx bx-error-circle" />
                Please enter a valid year.
              </span>
            </div>
          </form>
        </div>
        <button
          className="btn new-reseravation__btn"
          type="button"
          onClick={bookReservation}
        >
          Book Reservation
        </button>
      </div>
    </React.Fragment>
  );
}

export default NewReservation;  