import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RoomModal } from "../index";

import { useStateContext } from '../../StateContext';
import "./RoomContainer.css";

/**
 * This component displays a hotel room preview with room details.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 29th 2023
 * @returns {JSX.Element} The rendered RoomContainer component.
 */
function RoomContainer(props) {
  const { room, rooms } = props;
  // Accessing state and navigation
  const { setRoomType, userData } = useStateContext(); 
  const navigate = useNavigate();

  // State variable for room modal
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  /**
   * Opens the room modal for viewing room details.
   * @returns {void}
   */
  const openRoomModal = () => {
    setIsRoomModalOpen(true);
  };

  /**
   * Closes the room modal.
   * @returns {void}
   */
  const closeRoomModal = () => {
    setIsRoomModalOpen(false);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  }

  /**
   * Initiates the booking process for the selected room.
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void}
   */
  const initiateBooking = (e) => {
    const roomType = rooms.find((room) => room.roomType === e.target.id);
    setRoomType(roomType);
    if(userData?.authenticated) navigate("/reservation/new");
    else navigate("/signin");
  };

  return (
    <div className="room-container box-shadow">
      {!isImageLoaded && <div className="image-placeholder" />}
      <img 
        src={`/images/${room.roomType.toLowerCase()}/photo-1.jpg` }
        className="room-container__img" 
        alt="room-preview" 
        onLoad={handleImageLoad}
      />
      <div className="room-container__content">
        <h3>{room.roomType}</h3>
        <button 
          className="btn"
          type="button"
          onClick={initiateBooking}
          id={room.roomType}
        >
          Book for ${room.price}
        </button>
        <button 
          className="btn" 
          type="button" 
          onClick={openRoomModal}>
          Room Details
        </button>
      </div>
      {isRoomModalOpen && 
        <RoomModal 
          closeRoomModal={closeRoomModal} 
          initiateBooking={initiateBooking}
          room={room}
        />
      }
    </div>
  );
}

export default RoomContainer;