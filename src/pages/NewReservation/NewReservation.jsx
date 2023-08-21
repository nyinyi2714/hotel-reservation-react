import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import StayForm from "../../components/StayForm/StayForm";
import { useStateContext } from "../../StateContext";
import { backendUrl } from "../../config";
import "./NewReservation.css";

/**
 * This component handles the reservation details and payment form.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since August 1st 2023
 * @returns {JSX.Element} The rendered NewReservation component.
 */
function NewReservation() {
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
    accessToken,
  } = useStateContext();

  // State variables for reciept
  const [totalPrice, setTotalPrice] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [roomPrice, setRoomPrice] = useState(roomType.price);
  const taxRatePercent = 0.13;
  // Additional fee for guests after 2 people
  const additionalFeePerGuest = 25;
  const [additionalFee, setAdditionalFee] = useState(0);

  const successfulReservationMessage = "Your new reservation has been successfully created. Thank you!";
  const failedReservationMessage = "We are unable to process your request at the moment. Please try again later.";
  const [displayMessage, setDisplayMessage] = useState("");

  const handleCardNumber = (e) => {
    const inputNum = e.target.value;
    if (isNaN(inputNum)) return;
    if (inputNum.length <= 20) setCardNumber(inputNum);
    else setCardNumber(inputNum.slice(0, 20));
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
 * Converts a given date to an object containing its components.
 *
 * @param {Date} date - The input date object.
 * @returns {Object} An object containing the date's components: date, month, and year.
 */
  const convertDateToObj = (date) => {
    return {
      date: startDate.getDate(), 
      month: startDate.getMonth(), 
      year: startDate.getFullYear()
    };
  };

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

    // Prepare reservation data
    const reservationData = {
      date_of_occupancy: convertDateToObject(startDate),
      date_of_departure: convertDateToObject(endDate),
      room_id: roomType.id,
      number_of_guest: guestNum,
      card_number: cardNumber,
      total_price: totalPrice,
    };

    try {
      // Send reservation data via API request
      // TODO: new reservation route
      const response = await fetch(`${backendUrl}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setDisplayMessage(successfulReservationMessage);
      } else {
        setDisplayMessage(failedReservationMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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

  /**
 * Calculate the taxes based on the room price and tax rate percentage.
 * @returns {void}
 */
  const computeTaxes = () => {
    const taxes = (roomPrice * taxRatePercent);
    setTaxes(taxes);
  };

  /**
 * Calculate additional fees based on the number of guests above the base count.
 * @returns {void}
 */
  const computeAdditionalFee = () => {
    if(guestNum > 2) {
      setAdditionalFee((guestNum - 2) * additionalFeePerGuest);
    }
  };

  useMemo(() => {
    computeRoomPrice();
    computeTaxes();
    computeAdditionalFee();
    setTotalPrice((taxes + roomPrice + additionalFee));
  }, [startDate, endDate, roomType, guestNum, roomPrice, taxes]);

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
            <div className="new-reservation__row">
              <h3 className="new-reservation__total">Total for Stay</h3>
              <h3 className="new-reservation__total">
                ${totalPrice.toFixed(2)}
              </h3>
            </div>
            <div className="new-reservation__row">
              <span>{`1 King Bed ${roomType.name}`}</span>
              <span>${roomPrice.toFixed(2)}</span>
            </div>
            {guestNum > 2 && <div className="new-reservation__row">
              <span>
                <div className="new-reservation__tax-info">
                  ($25.00 per person)
                </div>
                Additional Fee for guests after 2 people
              </span>
              <span>${additionalFee.toFixed(2)}</span>
            </div>}
            <div className="new-reservation__row">
              <span>
                <div className="new-reservation__tax-info">
                  13.00 % per room, per night
                </div>
                Total Taxes
              </span>
              <span>${taxes.toFixed(2)}</span>
            </div>
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