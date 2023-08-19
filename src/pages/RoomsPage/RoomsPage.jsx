import React, { useState, useEffect, useMemo } from "react";
import StayForm from "../../components/StayForm/StayForm";
import RoomContainer from "../../components/RoomContainer/RoomContainer";
import { backendUrl } from "../../config";
import "./RoomsPage.css";

/**
 * Filters an array of rooms based on a room type query.
 * @param {Array} rooms - An array of room objects to be filtered.
 * @param {string} roomQuery - The room type query to filter the rooms.
 * @returns {Array} An array of room objects matching the room type query.
 */
export const filterRooms = (rooms, roomQuery) => {
  const filteredRooms = [];
    for (const room of rooms) {
      if (room.roomType.includes(roomQuery.toLowerCase())) {
        filteredRooms.push(room);
      }
    }
  return filteredRooms;
};

/**
 * Represents the Rooms page where users can search and select available rooms.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 13th 2023
 * @returns {JSX.Element} component that displays rooms page.
 */
function RoomsPage() {
  // TODO change the roomType, as it's coming from backend
  const [rooms, setRooms] = useState([{roomType: "standard"}, {roomType: "deluxe"}, {roomType: "suite"}]);
  const [roomQuery, setRoomQuery] = useState("");

  // Handles changes in the room search query input.
  const handleRoomQuery = (e) => {
    setRoomQuery(e.target.value);
  };

  
  const filteredRooms = useMemo(() => {
    // Filter Room Type
    return filterRooms(rooms, roomQuery);
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
    let numOfRoomAvailable = (roomQuery.length > 0) ? filteredRooms.length: rooms.length;
    let message = (roomQuery.length > 0) ? "search query" : "stay";
    return `We found ${numOfRoomAvailable} available room type${numOfRoomAvailable > 1 ? "s" : ""} for your current ${message}.`;
  };

  /**
   * Fetches rooms data from the backend and updates state.
   * @returns {void}
   */
  const updateRooms = async () => {
    try {
      const data = await fetch(`${backendUrl}/show/allRooms`);
      const roomsData = await data.json();
      setRooms(roomsData);
    } catch (error) {
      console.error(error);
    }
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
        {filteredRooms.map(room => <RoomContainer room={room} />)}
      </div>
      {filteredRooms.length === 0 && 
        <div className="rooms-page__err">
          No room found for current search query
        </div>
      }
    </div>
  );
}

export default RoomsPage;