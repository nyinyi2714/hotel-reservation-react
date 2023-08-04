import React, { useState } from "react";
import ReservationContainer from "../../components/ReservationContainer/ReservationContainer";
import RoomModal from "../../components/RoomModal/RoomModal";
import EditReservaion from "../../components/EditReservation/EditReservation"
import "./ManageReservation.css";

export default function ManageReservation() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomOpen] = useState(false);

  const openRoomModal = () => {
    // TODO: Pass room obj as props to roomModal
    setIsRoomOpen(true);
  };

  const closeRoomModal = () => {
    setIsRoomOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="manage-reservation">
      <h2>Your Reservations</h2>
        <div className="manage-reservation__display">
          <ReservationContainer 
            openRoomModal={openRoomModal} 
            openEditModal={openEditModal}
          />
          <ReservationContainer 
            openRoomModal={openRoomModal} 
            openEditModal={openEditModal}
          />
          <ReservationContainer 
            openRoomModal={openRoomModal} 
            openEditModal={openEditModal}
          />
        </div>
      {isRoomModalOpen && <RoomModal closeRoomModal={closeRoomModal} />}
      {isEditModalOpen && <EditReservaion closeEditModal={closeEditModal} />}
    </div>
  );
}