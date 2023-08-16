import React, { useState, useEffect, useMemo } from "react";
import StayForm from "../../components/StayForm/StayForm";
import RoomContainer from "../../components/RoomContainer/RoomContainer";
import "./RoomsPage.css";

/**
 * Represents the Rooms page where users can search and select available rooms.
 * @component
 * @returns {JSX.Element} component that displays rooms page.
 */
function RoomsPage() {
  const [rooms, setRooms] = useState([{roomType: "standard"}, {roomType: "deluxe"}, {roomType: "suite"}]);
  const [roomQuery, setRoomQuery] = useState("");

  // Handles changes in the room search query input.
  const handleRoomQuery = (e) => {
    setRoomQuery(e.target.value);
  };

  /**
   * Filters rooms based on the room query using memoization.
   * @returns {void}
   */
  const searchedRooms = useMemo(() => {
    // Search Room Type
    const result = rooms.filter((room) => room.roomType.includes(roomQuery.toLowerCase()));
    return result;
  }, [rooms, roomQuery]);

  /**
   * Clears the room search query.
   * @returns {void}
   */
  const clearRoomQuery = () => {
    if(roomQuery.length <= 0) return;
    setRoomQuery("");
  };

  /**
   * Generates a message to display the number of available rooms based on the query.
   * @returns {string} - The message to display.
   */
  const displayMessage = () => {
    let numOfRoomAvailable = (roomQuery.length > 0) ? searchedRooms.length: rooms.length;
    let message = (roomQuery.length > 0) ? "search query" : "stay";
    return `We found ${numOfRoomAvailable} available room type for your current ${message}.`;
  };

  /**
   * Fetches rooms data from the backend and updates state.
   * @returns {void}
   */
  const updateRooms = () => {
    // TODO
  };

  useEffect(() => {
    // Fetch rooms data from backend
    updateRooms();
  }, []);

  return(
    <div className="rooms-page">
      <StayForm />
      <h3 className="rooms-page__subheading">Step 1 of 2</h3>
      <h2 className="rooms-page__heading">Select a Room</h2>
      <input
        className="rooms-page__search" 
        type="text" 
        placeholder="Search Room Type" 
        onChange={handleRoomQuery}
        value={roomQuery}
      />
      <button 
        className="rooms-page__btn btn" 
        type="button" 
        onClick={clearRoomQuery}
      >
        Clear
      </button>
      <div>{displayMessage()}</div>
      <div className="rooms-page__gallery">
        {searchedRooms.map(room => <RoomContainer room={room} />)}
      </div>
      {searchedRooms.length === 0 && 
        <div className="rooms-page__err">
          No room found for current search query
        </div>
      }
    </div>
  );
}

export default RoomsPage;