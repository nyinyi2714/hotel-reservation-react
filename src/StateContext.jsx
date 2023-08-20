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
  const [accessToken, setAccessToken] = useState("");
  const [isModifying, setIsModifying] = useState(true);

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
    user, 
    setUser,
    accessToken,
    setAccessToken,
    resetState,
    isModifying,
    setIsModifying
  };

  return (
    <StateContext.Provider value={states}>
      {children}
    </StateContext.Provider>
  );
}
