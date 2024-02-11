import React, { useEffect, useState } from "react";

import useBackend from "../../hooks/useBackend";

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

  const { fetchReservations } = useBackend();

  const [reservations, setReservations] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomOpen] = useState(false);
  const [currReservation, setCurrReservation] = useState(null);

  /**
  * Retrieves a reservation by its unique identifier from the reservations array.
  * @param {number} id - The unique identifier of the reservation to retrieve.
  * @returns {Object|null} The reservation object if found, or null if not found.
  */
  const getReservationById = (id) => {
    return reservations.find(reservation => reservation._id === id);
  };

  /**
   * Opens the room modal for viewing room details.
   * @returns {void}
   */
  const openRoomModal = (e) => {
    setIsRoomOpen(true);
    setCurrReservation(getReservationById(e.target.id));
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
  const openEditModal = (e) => {
    setIsEditModalOpen(true);
    setCurrReservation(getReservationById(e.target.id));
  };

  /**
   * Closes the edit reservation modal.
   * @returns {void}
   */
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  function convertDateObjectToDate(dateObject) {
    const { year, month, day } = dateObject;
    // Months in JavaScript Date object are 0-indexed, so subtract 1 from the month
    return new Date(year, month - 1, day);
  }

  /**
 * Fetches reservations from the backend API and updates the state with active reservations.
 * @returns {void}
 */

  const handleFetchReservations = async () => {
    const reservationsData = await fetchReservations();
    setReservations(reservationsData);
  };

  useEffect(() => {
    handleFetchReservations();
  }, []);

  return (
    <div className="manage-reservation">
      <h2>Your Reservations</h2>
        <div className="manage-reservation__display">
          {reservations && reservations.map((reservation, index) => {
            return <ReservationContainer 
              openRoomModal={openRoomModal} 
              openEditModal={openEditModal}
              reservation={reservation}
              convertDateObjectToDate={convertDateObjectToDate}
              key={index}
            />
          })}
        </div>
        {reservations && reservations.length <= 0 && 
          <div className="manage-reservation__err">
            You Don't Have Any Reservation.
          </div>
        }
      {isRoomModalOpen && 
      <RoomModal 
        closeRoomModal={closeRoomModal}
        room={currReservation} 
      />
      }
      {isEditModalOpen && 
        <EditReservation 
          closeEditModal={closeEditModal} 
          reservation={currReservation} 
          convertDateObjectToDate={convertDateObjectToDate}
          handleFetchReservations={handleFetchReservations}
        />
      }
    </div>
  );
}

export default ManageReservation;