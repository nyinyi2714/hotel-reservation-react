import React, { useState, useEffect, useRef } from "react";
import "./RoomsPage.css";

export default function RoomsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestNum, setGuestNum] = useState(1);
  const startDatePicker = useRef();

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const openDatePicker = () => {
    
  }

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

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "Monday", 
      "Tuesday", 
      "Wednesday", 
      "Thursday", 
      "Friday", 
      "Saturday", 
      "Sunday",
    ];
    const date = new Date(dateString);
    // Get the day of the week as an integer (0-6)
    const dayOfWeekIndex = date.getDay(); 
  
    // Get the corresponding day name from the array
    return daysOfWeek[dayOfWeekIndex]; 
  };

  // Function to get tomorrow's date
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomorrowYear = tomorrow.getFullYear();
    const tomorrowMonth = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const tomorrowDay = tomorrow.getDate().toString().padStart(2, '0');

    return `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
  };

  // Function to get the date that is 2 years from a given date
  const getDateTwoYearsFrom = (today) => {
    const todayDate = new Date(today + 'T00:00:00');
    const futureDate = new Date(todayDate);
    futureDate.setFullYear(todayDate.getFullYear() + 2);

    const futureYear = futureDate.getFullYear();
    const futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const futureDay = futureDate.getDate().toString().padStart(2, '0');

    return `${futureYear}-${futureMonth}-${futureDay}`;
  }

  const today = new Date().toLocaleDateString('en-CA');
  const tomorrow = getTomorrowDate();
  const twoYearsFromToday = getDateTwoYearsFrom(today);
  const twoYearsFromTomorrow = getDateTwoYearsFrom(tomorrow);

  return(
    <div className="rooms-page">
      <form className="rooms-page__stay-form">
        <div className="rooms-page__start-date">
          <label htmlFor="start_date">Start Date:</label>
          <input 
            type="date" 
            id="start_date" 
            value={startDate} 
            min={today}
            max={twoYearsFromToday}
            onChange={handleStartDate}
            onClick={openDatePicker}
            ref={startDatePicker}
          />
        </div>
        <div className="rooms-page__end-date">
          End Date: 
          <input 
            type="date" 
            name="end_date" 
            value={endDate} 
            min={tomorrow}
            max={twoYearsFromTomorrow}
            onChange={handleEndDate}
          />
        </div>
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