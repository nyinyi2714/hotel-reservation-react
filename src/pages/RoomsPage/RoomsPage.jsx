import React, { useState, useEffect, useMemo } from "react";

import { StayForm, RoomContainer } from "../../components";
import { BACKEND_API } from "../../config";

import "./RoomsPage.css";

/**
 * Represents the Rooms page where users can search and select available rooms.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 13th 2023
 * @returns {JSX.Element} component that displays rooms page.
 */
function RoomsPage() {
  const [rooms, setRooms] = useState(null);
  const [roomQuery, setRoomQuery] = useState("");

  // Handles changes in the room search query input.
  const handleRoomQuery = (e) => {
    setRoomQuery(e.target.value);
  };

  const filterRooms = () => {
    const filteredRooms = [];
      for (const room of rooms) {
        if (room.roomType.toLowerCase().includes(roomQuery.toLowerCase())) {
          filteredRooms.push(room);
        }
      }
    return filteredRooms;
  };

  
  const filteredRooms = useMemo(() => {
    if(!rooms) return [];
    // Filter Room roomType
    return filterRooms();
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
    if(!rooms) return "Loading...";

    let numOfRoomAvailable = (roomQuery.length > 0) ? filteredRooms.length: rooms.length;
    let message = (roomQuery.length > 0) ? "search query" : "stay";
    return `We found ${numOfRoomAvailable} available room type${numOfRoomAvailable > 1 ? "s" : ""} for your current ${message}.`;
  };

  // Update rooms data from backend
  useEffect(() => {
    const updateRooms = () => {
      fetch(`${BACKEND_API}/rooms/json`)
       .then(res => res.json())
       .then(roomData => setRooms(roomData))
       .catch(error => console.error("Error fetching data:", error));
    }
    updateRooms()
  }, [])

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
        {filteredRooms.map(room => <RoomContainer room={room} key={room.id} rooms={rooms} />)}
      </div>
      {rooms && filteredRooms.length === 0 && 
        <div className="rooms-page__err">
          No room found for current search query
        </div>
      }
      {!rooms && 
        <div className="rooms-page__err">
          {/* TODO: Add Spinner */}
          Loading...
        </div>
      }
    </div>
  );
}

export default RoomsPage;