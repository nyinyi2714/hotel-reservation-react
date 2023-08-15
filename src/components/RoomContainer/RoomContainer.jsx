import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomModal from "../RoomModal/RoomModal";
import { useStateContext } from '../../StateContext';
import "./RoomContainer.css";

/**
 * This component displays a hotel room preview with room details.
 * @component
 * @returns {JSX.Element} The rendered RoomContainer component.
 */
function RoomContainer() {
  // Accessing state and navigation
  const { setRoomType } = useStateContext(); 
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
    let roomType = e.target.id;
    setRoomType(roomType);
    navigate("/reservation/new");
  };

  return (
    <div className="room-container box-shadow">
      {/* /images/{room-type}/photo-1.jpg */}
      <img 
        src="/images/room-1/photo-1.jpg" 
        className="room-container__img" 
        alt="room-preview" 
      />
      <div className="room-container__content">
        <h3>Hotel Room Title</h3>
        <button 
          className="btn"
          type="button"
          onClick={initiateBooking}
          id={"room.room_number"}
        >
          Book for $137
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
        />
      }
    </div>
  );
}

export default RoomContainer;