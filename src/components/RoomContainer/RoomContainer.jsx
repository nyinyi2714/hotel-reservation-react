import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomModal from "../RoomModal/RoomModal";
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
  const { setRoomType, user } = useStateContext(); 
  const navigate = useNavigate();

  // State variable for room modal
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

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

  /**
   * Initiates the booking process for the selected room.
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void}
   */
  const initiateBooking = (e) => {
    const roomId = e.target.id;
    const roomType = rooms.find((room) => room.id == roomId);
    setRoomType(roomType);
    if(user) navigate("/reservation/new");
    else navigate("/signin");
  };

  return (
    <div className="room-container box-shadow">
      <img 
        src={`/images/${room.type.toLowerCase()}/photo-1.jpg` }
        className="room-container__img" 
        alt="room-preview" 
      />
      <div className="room-container__content">
        <h3>{room.type}</h3>
        <button 
          className="btn"
          type="button"
          onClick={initiateBooking}
          id={room.id}
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