import React, { useState } from "react";
import ReservationContainer from "../../components/ReservationContainer/ReservationContainer";
import RoomModal from "../../components/RoomModal/RoomModal";
import "./ManageReservation.css";

export default function ManageReservation() {
  const [isRoomModalOpen, setIsRoomOpen] = useState(false);

  const openRoomModal = () => {
    // TODO: Pass room obj as props to roomModal
    setIsRoomOpen(true);
  };

  const closeRoomModal = () => {
    setIsRoomOpen(false);
  };

  return (
    <div className="manage-reservation">
      <h2>Your Reservations</h2>
        <div className="manage-reservation__display">
          <ReservationContainer openRoomModal={openRoomModal} />
          <ReservationContainer openRoomModal={openRoomModal} />
          <ReservationContainer openRoomModal={openRoomModal} />
          <ReservationContainer openRoomModal={openRoomModal} />
          <ReservationContainer openRoomModal={openRoomModal} />
        </div>
      {isRoomModalOpen && <RoomModal closeRoomModal={closeRoomModal} />}
    </div>
  );
}