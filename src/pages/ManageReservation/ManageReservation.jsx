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
  const [reservations, setReservations] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomOpen] = useState(false);
  const [currReservation, setCurrReservation] = useState(null);

  const { accessToken } = useStateContext();

  // TODO: doc
  const getReservationById = (id) => {
    return reservations.find(reservation => reservation.reservation_id == id);
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

  // TODO: doc
  const convertStringToDateObj = (string) => {
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
  
    const parts = string.split(" ");
    const day = parseInt(parts[1], 10);
    const month = months[parts[2]];
    const year = parseInt(parts[3], 10);
  
    return new Date(year, month, day);
  };

  // TODO
  const fetchReservations = async () => {
    try {
      const response = await fetch(`${backendUrl}/show/userReservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const reservationsData = await response.json();
      const activeReservations = reservationsData.reservations.filter(reservation => reservation.is_active);
      setReservations(activeReservations);

      if (response.ok) {
        console.log("fetch successfully")
      } else {
        console.error("Reservation fetch failed:", reservationsData.message);
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
          {reservations && reservations.map((reservation, index) => {
            return <ReservationContainer 
              openRoomModal={openRoomModal} 
              openEditModal={openEditModal}
              convertStringToDateObj={convertStringToDateObj}
              reservation={reservation}
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
        room={currReservation.room_details} 
      />
      }
      {isEditModalOpen && 
        <EditReservation 
          closeEditModal={closeEditModal} 
          reservation={currReservation} 
          fetchReservations={fetchReservations}
          convertStringToDateObj={convertStringToDateObj}
        />
      }
    </div>
  );
}

export default ManageReservation;