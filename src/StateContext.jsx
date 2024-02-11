import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function StateProvider({ children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  });
  const [guestNum, setGuestNum] = useState(1);
  const [roomType, setRoomType] = useState();
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken") || '');

  const resetState = () => {
    setStartDate(new Date());
    setEndDate(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow;
    });
    setGuestNum(1);
    setRoomType(null);
  };

  const states = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    guestNum,
    setGuestNum,
    roomType, 
    setRoomType,
    resetState,
    accessToken, 
    setAccessToken,
  };

   // Update sessionStorage when accessToken changes
   useEffect(() => {
    sessionStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  return (
    <StateContext.Provider value={states}>
      {children}
    </StateContext.Provider>
  );
}
