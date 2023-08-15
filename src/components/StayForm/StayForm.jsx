import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StayForm.css";
import { useStateContext } from "../../StateContext";

export default function StayForm() {
  const {
    startDate, 
    endDate, 
    guestNum, 
    setStartDate,
    setEndDate, 
    setGuestNum, 
  } = useStateContext();
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

  const updateStayData = () => {
    setStartDate(currStartDate);
    setEndDate(currEndDate);
    setGuestNum(currGuestNum);
  }; 

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

  const openStartDatePicker = () => {
    startDatePicker.current.setOpen(true);
  };

  const openEndDatePicker = () => {
    endDatePicker.current.setOpen(true);
  };

  const getDate = (d) => {
    const date = d.getDate();
    return date < 9 ? "0" + date : date;
  } 

  const getDay = (date) => {
    return daysOfWeek.current[date.getDay()];
  };

  const getMonth = (date) => {
    return monthsOfYear.current[date.getMonth()];
  };

  const getTomorrow = (date) => {
    const currDate = new Date(date);
    const nextDate = new Date(currDate);
    return nextDate.setDate(currDate.getDate() + 1);
  };

  const sameStartYearAndEndYear = () => {
    return startDate.getFullYear() == endDate.getFullYear();
  }; 

  const decrementGuestNum = () => {
    if(currGuestNum <= 1) return;
    setCurrGuestNum(state => state - 1);
  }; 

  const incrementGuestNum = () => {
    if(currGuestNum >= 6) return;
    setCurrGuestNum(state => state + 1);
  }; 

  const getNumOfNight = () => {
    return getDate(endDate) - getDate(startDate);
  };

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
            className={`${currGuestNum >= 6 && "disabled"}`}
            onClick={incrementGuestNum}
          >
            <i className='bx bx-plus' />
          </button>
        </div>
        <button 
          type="button" 
          className={`stay-form__update-btn ${!haveUnsavedChanges() && "disabled"}`}
          onClick={updateStayData}
        >
          Update
        </button>
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