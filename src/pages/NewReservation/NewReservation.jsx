import React, { useState, useEffect } from "react";
import StayForm from "../../components/StayForm/StayForm";
import "./NewReservation.css";

export default function NewReservation(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);

  // TODO: roomNumber is in props.states.roomNumber

  const handleCardNumber = (e) => {
    const inputNum = e.target.value;
    if(isNaN(inputNum)) return;
    if(inputNum.length <= 16) setCardNumber(inputNum);
    else setCardNumber(inputNum.slice(0, 16));
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    const inputYear = e.target.value;
    if(inputYear.length <= 4) setYear(inputYear);
    else setYear(inputYear.slice(0, 4));
  };

  // Validate Year
  const validateYear = () => {
    const currentYear = new Date().getFullYear();
    const yearInput = parseInt(year, 10);
    const result = yearInput >= currentYear;
    setIsYearValid(result);
    return result;
  };

  // Validate Card Number
  const validateCardNumber = () => {
    let result = cardNumber.length >= 15 && cardNumber.length <= 16;
    setIsCardNumberValid(result);
    return result;
  };

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
    if(isCardNumberValid) return;
    validateCardNumber();
  }, [cardNumber]);

  useEffect(() => {
    if(isYearValid) return;
    validateYear();
  }, [year]);

  const bookReservation = () => {
    // TODO
    validateCardNumber();
    validateYear();
  };

  return (
    <div className="new-reservation">
      <StayForm states={props.states} />
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
            <h3 className="new-reservation__total">$283.92</h3>
          </div>
          <div className="new-reservation__row">
            <span>1 King Bed Stardard</span>
            <span>$251.26</span>
          </div>
          <div className="new-reservation__row">
            <span>
              <div className="new-reservation__tax-info">
                13.00 % per room, per night
              </div>
              Total Taxes
            </span>
            <span>$32.26</span>
          </div>
        </div>
      </div>
      <div className="new-reservation__payment">
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
                :"new-reservation__invalid"
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
  );
}