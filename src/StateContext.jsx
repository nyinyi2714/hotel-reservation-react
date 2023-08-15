import React, { createContext, useContext, useState } from "react";

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
  const [user, setUser] = useState(null);

  const states = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    guestNum,
    setGuestNum,
    roomType, 
    setRoomType,
    user, 
    setUser
  };

  return (
    <StateContext.Provider value={states}>
      {children}
    </StateContext.Provider>
  );
}
