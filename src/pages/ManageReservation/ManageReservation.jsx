import React, { useEffect, useState } from "react";
import ReservationContainer from "../../components/ReservationContainer/ReservationContainer";
import RoomModal from "../../components/RoomModal/RoomModal";
import EditReservation from "../../components/EditReservation/EditReservation";
import "./ManageReservation.css";

/**
 * This component displays a list of reservations and provides options to open modals for rooms and editing.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 28th 2023
 * @returns {JSX.Element} The rendered ManageReservation component.
 */
function ManageReservation() {
  // TODO: delete the {}
  const [reservations, setReservations] = useState([{}]);
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

  const fetchReservations = () => {
    // TODO
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="manage-reservation">
      <h2>Your Reservations</h2>
        <div className="manage-reservation__display">
          {reservations.map(reservation => {
            return <ReservationContainer 
              openRoomModal={openRoomModal} 
              openEditModal={openEditModal}
              reservation={reservation}
            />
          })}
        </div>
        {reservations.length <= 0 && 
          <div className="manage-reservation__err">
            You Don't Have Any Reservation.
          </div>
        }
      {isRoomModalOpen && <RoomModal closeRoomModal={closeRoomModal} />}
      {/* TODO: pass reservation (has to be the one user clicks) as props */}
      {isEditModalOpen && 
        <EditReservation 
          closeEditModal={closeEditModal} 
          reservation={{}} 
          fetchReservations={fetchReservations}
        />
      }
    </div>
  );
}

export default ManageReservation;