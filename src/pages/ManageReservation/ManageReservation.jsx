import React, { useContext, useEffect, useState } from "react";
import ReservationContainer from "../../components/ReservationContainer/ReservationContainer";
import RoomModal from "../../components/RoomModal/RoomModal";
import EditReservation from "../../components/EditReservation/EditReservation";
import { useStateContext } from "../../StateContext";
import { backendUrl } from "../../config";
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

  const { accessToken } = useStateContext();
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

  const fetchReservations = async () => {
    // TODO
    try {
      const response = await fetch(`${backendUrl}/show/userReservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const reservationsData = await response.json();
      console.log(reservationData)
      setReservations(reservationsData);

      if (response.ok) {
        // TODO: display successful modification message
        console.log("Modified successfully")
      } else {
        console.error("Reservation modification failed:", reservationsData.message);
      }
    } catch(err) {
      console.error(err);
    }
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
              key={reservation.reservation_id}
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