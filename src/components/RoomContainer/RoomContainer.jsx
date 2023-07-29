import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomModal from "../RoomModal/RoomModal";
import { useStateContext } from '../../StateContext';
import "./RoomContainer.css";

export default function RoomContainer() {
  const { setRoomNumber } = useStateContext(); 
  const navigate = useNavigate();
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const openRoomModal = () => {
    setIsRoomModalOpen(true);
  };

  const closeRoomModal = () => {
    setIsRoomModalOpen(false);
  };

  const initiateBooking = (e) => {
    let roomNumber = e.target.id;
    setRoomNumber(roomNumber);
    navigate("/reservation/new");
  };

  return (
    <div className="room-container box-shadow">
      {/* /images/{room-number}/photo-1.jpg */}
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
        {/* <div className="room-container__unavailable">
          <h4>Sold out</h4>
          <span>Not available on your selected dates</span>
        </div> */}
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