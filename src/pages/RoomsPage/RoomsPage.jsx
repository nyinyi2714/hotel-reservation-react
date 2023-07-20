import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomsPage.css";

export default function RoomsPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guestNum, setGuestNum] = useState(1);
  const startDatePicker = useRef();
  const endDatePicker = useRef();
  const daysOfWeek = useRef([
    "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"
  ]);
  const monthsOfYear = useRef([
    "Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ]);

  const handleStartDate = (date) => {
    setStartDate(date);
    date.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if(date.getTime() >= endDate.getTime()) {
      const currDay = new Date(date);
      const nextDay = new Date(currDay);
      nextDay.setDate(currDay.getDate() + 1);
      setEndDate(nextDay);
    }
  };

  const handleEndDate = (date) => {
    setEndDate(date);
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

  // Update DatePickers with today and tomorrow date
  useEffect(() => {
    setStartDate(today);
    setEndDate(tomorrow);
  }, []);

  const decrementGuestNum = () => {
    if(guestNum <= 1) return;
    setGuestNum(state => state - 1);
  }; 

  const incrementGuestNum = () => {
    if(guestNum >= 6) return;
    setGuestNum(state => state + 1);
  }; 

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(today.getFullYear() + 1);

  const oneYearFromTomorrow = new Date(tomorrow);
  oneYearFromTomorrow.setFullYear(tomorrow.getFullYear() + 1);

  return(
    <div className="rooms-page">
      <form className="rooms-page__stay-form">
        <span className="relative-position">
          <div 
            className="rooms-page__date-wrapper clickable"
            onClick={openStartDatePicker}
          >
            <div className="rooms-page__date">{getDate(startDate)}</div>
            <div className="rooms-page__month">{getMonth(startDate)}</div>
            <div className="rooms-page__day">{getDay(startDate)}</div>
          </div>
          <DatePicker 
            selected={startDate} 
            minDate={today}
            maxDate={oneYearFromToday}
            onChange={handleStartDate}
            dateFormat="yyyy-MM-dd"
            ref={startDatePicker}
          />
        </span>
        <span className="relative-position">
          <div 
            className="rooms-page__date-wrapper clickable"
            onClick={openEndDatePicker}
          >
            <div className="rooms-page__date">{getDate(endDate)}</div>
            <div className="rooms-page__month">{getMonth(endDate)}</div>
            <div className="rooms-page__day">{getDay(endDate)}</div>
          </div>
          <DatePicker 
            selected={endDate} 
            minDate={getTomorrow(startDate)}
            maxDate={oneYearFromTomorrow}
            onChange={handleEndDate}
            dateFormat="yyyy-MM-dd"
            ref={endDatePicker}
          />
        </span>
        <div className="rooms-page__guests-num">
          <button 
            type="button"
            className={`${guestNum <= 1 && "disabled"}`}
            onClick={decrementGuestNum}
          >
            <i className='bx bx-minus' />
          </button>
          {guestNum} Guest{guestNum > 1 && "s"}
          <button
            type="button"
            className={`${guestNum >= 6 && "disabled"}`}
            onClick={incrementGuestNum}
          >
            <i className='bx bx-plus' />
          </button>
        </div>
      </form>
      <div className="rooms-page__rooms-gallery">

      </div>
    </div>
  );
}