import React, { useState } from "react";
import ReservationContainer from "../../components/ReservationContainer/ReservationContainer";
import RoomModal from "../../components/RoomModal/RoomModal";
import EditReservation from "../../components/EditReservation/EditReservation"
import "./ManageReservation.css";

/**
 * This component displays a list of reservations and provides options to open modals for rooms and editing.
 * @component
 * @returns {JSX.Element} The rendered ManageReservation component.
 */
function ManageReservation() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomOpen] = useState(false);

  /**
   * Opens the room modal for viewing room details.
   * @returns {void}
   */
  const openRoomModal = () => {
    // TODO: Pass room obj as props to roomModal
    setIsRoomOpen(true);
  };

  /**
   * Closes the room modal.
   * @returns {void}
   */
  const closeRoomModal = () => {
    setIsRoomOpen(false);
  };

  /**
   * Opens the edit reservation modal.
   * @returns {void}
   */
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  /**
   * Closes the edit reservation modal.
   * @returns {void}
   */
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
      {isEditModalOpen && <EditReservation closeEditModal={closeEditModal} />}
    </div>
  );
}

export default ManageReservation;