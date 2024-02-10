import React, { useState, useRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StayForm.css";
import { useStateContext } from "../../StateContext";

/**
 * This component allows users to select checkin / checkout dates and guest numbers.
 * @component 
 * @author Nyi Nyi Moe Htet
 * @since August 1st 2023
 * @returns {JSX.Element} The rendered StayForm component.
 */
function StayForm(props) {
  const { isModifying, reservation, convertDateObjectToDate } = props;
  let {
    startDate, 
    endDate, 
    guestNum, 
    setStartDate,
    setEndDate, 
    setGuestNum, 
  } = useStateContext();

  if(isModifying) {
    startDate = convertDateObjectToDate(reservation.checkinDate);
    endDate = convertDateObjectToDate(reservation.checkoutDate);
    guestNum = reservation.numOfGuests;
  }
  const [currStartDate, setCurrStartDate] = useState(startDate);
  const [currEndDate, setCurrEndDate] = useState(endDate);
  const [currGuestNum, setCurrGuestNum] = useState(guestNum);
  const startDatePicker = useRef();
  const endDatePicker = useRef();
  const daysOfWeek = useRef([
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ]);
  const monthsOfYear = useRef([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]);
  
  const handleCurrStartDate = (date) => {
    setCurrStartDate(date);
    date.setHours(0, 0, 0, 0);
    currEndDate.setHours(0, 0, 0, 0);

    if(date.getTime() >= currEndDate.getTime()) {
      const currDay = new Date(date);
      const nextDay = new Date(currDay);
      nextDay.setDate(currDay.getDate() + 1);
      setCurrEndDate(nextDay);
    }
  };
  
  const handleCurrEndDate = (date) => {
    setCurrEndDate(date);
  };

  /**
   * Using the current values of currStartDate, currEndDate, and 
   * currGuestNum, this function updates the start date, end date,
   * and guest number stored in StateContest.jsx.
   * @returns {void}
   */
  const updateStayData = () => {
    setStartDate(currStartDate);
    setEndDate(currEndDate);
    setGuestNum(currGuestNum);
  }; 

  useMemo(() => {
    if(!isModifying) return;
    updateStayData();
  }, [currStartDate, currEndDate, currGuestNum]);

  /**
   * Checks if there are unsaved changes in the form.
   * @returns {boolean} True if there are unsaved changes, otherwise false.
  */
  const haveUnsavedChanges = () => {
    startDate.setHours(0, 0, 0, 0);
    currStartDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    currEndDate.setHours(0, 0, 0, 0);
    if(startDate.getTime() !== currStartDate.getTime() 
      || endDate.getTime() !== currEndDate.getTime() 
      || guestNum !== currGuestNum) {
      return true;
    }
    return false;
  };

  /**
   * Opens the start date picker.
   * @returns {void}
  */
  const openStartDatePicker = () => {
    startDatePicker.current.setOpen(true);
  };

/**
 * Opens the end date picker.
 * @returns {void}
 */
  const openEndDatePicker = () => {
    endDatePicker.current.setOpen(true);
  };

  /**
   * Formats the date to return day of the month with leading zero.
   * @param {Date} d - The input date.
   * @returns {string} The formatted day of the month.
  */
  const getDate = (d) => {
    const date = d.getDate();
    return date < 9 ? "0" + date : date;
  } 

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
 * Returns the date of the next day.
 * @param {Date} date - The input date.
 * @returns {Date} The date of the next day.
 */
  const getTomorrow = (date) => {
    const currDate = new Date(date);
    const nextDate = new Date(currDate);
    return nextDate.setDate(currDate.getDate() + 1);
  };

  /**
 * Checks if the start and end dates have the same year.
 * @returns {boolean} True if the start and end dates have the same year, otherwise false.
 */
  const sameStartYearAndEndYear = () => {
    return startDate.getFullYear() === endDate.getFullYear();
  }; 

  const decrementGuestNum = () => {
    if(currGuestNum <= 1) return;
    setCurrGuestNum(state => state - 1);
  }; 

  const incrementGuestNum = () => {
    if(currGuestNum >= 4) return;
    setCurrGuestNum(state => state + 1);
  }; 

  /**
 * Calculates the number of nights between the start and end dates.
 * @returns {number} The number of nights.
 */
  const getNumOfNight = () => {
    const timeDifference =  endDate.getTime() - startDate.getTime();
    // Convert the time difference to days
    return timeDifference / (1000 * 60 * 60 * 24);
  };

  /**
 * Generates a formatted date string.
 * @returns {string} The formatted date string.
 */
  const generateDate = () => {
    let displayBothYear = !sameStartYearAndEndYear();
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
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(today.getFullYear() + 1);

  const oneYearFromTomorrow = new Date(tomorrow);
  oneYearFromTomorrow.setFullYear(tomorrow.getFullYear() + 1);

  return (
    <form className="stay-form">
      <div className="stay-form__flex-container">
        <span className="relative-position">
          <div 
            className="stay-form__date-wrapper clickable"
            onClick={openStartDatePicker}
          >
            <div className="stay-form__date">{getDate(currStartDate)}</div>
            <div className="stay-form__month">{getMonth(currStartDate)}</div>
            <div className="stay-form__day">{getDay(currStartDate)}</div>
          </div>
          <DatePicker 
            selected={currStartDate} 
            minDate={today}
            maxDate={oneYearFromToday}
            onChange={handleCurrStartDate}
            dateFormat="yyyy-MM-dd"
            ref={startDatePicker}
          />
        </span>
        <span className="relative-position">
          <div 
            className="stay-form__date-wrapper clickable"
            onClick={openEndDatePicker}
          >
            <div className="stay-form__date">{getDate(currEndDate)}</div>
            <div className="stay-form__month">{getMonth(currEndDate)}</div>
            <div className="stay-form__day">{getDay(currEndDate)}</div>
          </div>
          <DatePicker 
            selected={currEndDate} 
            minDate={getTomorrow(currStartDate)}
            maxDate={oneYearFromTomorrow}
            onChange={handleCurrEndDate}
            dateFormat="yyyy-MM-dd"
            ref={endDatePicker}
          />
        </span>
        <div className="stay-form__guests-num">
          <button 
            type="button"
            className={`${currGuestNum <= 1 && "disabled"}`}
            onClick={decrementGuestNum}
          >
            <i className='bx bx-minus' />
          </button>
          {currGuestNum} Guest{currGuestNum > 1 && "s"}
          <button
            type="button"
            className={`${currGuestNum >= 4 && "disabled"}`}
            onClick={incrementGuestNum}
          >
            <i className='bx bx-plus' />
          </button>
        </div>
        {!isModifying && <button 
          type="button" 
          className={`stay-form__update-btn ${!haveUnsavedChanges() && "disabled"}`}
          onClick={updateStayData}
        >
          Update
        </button>}
      </div>
      <div className="stay-form__stay-data">
        <span className="bold margin-right">Your Stay</span>
        <span className="stay-form__dates">
          {generateDate()}
        </span>
        <span className="stay-form__nights margin-right">
          {`(${getNumOfNight()} night${getNumOfNight() > 1 ? "s" : ""})`}
        </span>
        <span className="stay-form__guest-num">
          for {guestNum} Guest{guestNum > 1 && "s"}
        </span>
      </div>
    </form>
  );
}

export default StayForm;