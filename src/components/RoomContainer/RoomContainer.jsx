import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomModal from "../RoomModal/RoomModal";
import { useStateContext } from '../../StateContext';
import "./RoomContainer.css";

export default function RoomContainer(props) {
  const { setRoomType } = useStateContext(); 
  const navigate = useNavigate();
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const openRoomModal = () => {
    setIsRoomModalOpen(true);
  };

  const closeRoomModal = () => {
    setIsRoomModalOpen(false);
  };

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