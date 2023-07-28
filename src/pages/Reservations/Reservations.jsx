import React, { useState } from 'react';

const BookingContainer = () => {
  const [isRoomDetailModalOpen, setRoomDetailModalOpen] = useState(false);
  const [isEditReservationModalOpen, setEditReservationModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const bookingData = {
    bookingDate: "July 27, 2023",
    checkInDate: "August 1, 2023",
    checkOutDate: "August 5, 2023",
    totalCost: "$500",
  };

  const openModal = (modalName) => {
    switch (modalName) {
      case 'roomDetail':
        setRoomDetailModalOpen(true);
        break;
      case 'editReservation':
        setEditReservationModalOpen(true);
        break;
      case 'confirmation':
        setConfirmationModalOpen(true);
        break;
      default:
        break;
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'roomDetail':
        setRoomDetailModalOpen(false);
        break;
      case 'editReservation':
        setEditReservationModalOpen(false);
        break;
      case 'confirmation':
        setConfirmationModalOpen(false);
        break;
      default:
        break;
    }
  };

  const cancelReservation = () => {
    // Perform reservation cancellation logic here
    // E.g., send cancellation request to the server
    alert("Reservation cancelled successfully!");
    closeModal('confirmation');
  };

  return (
    <div className="container">
      <div className="booking-info">
        <p>Booking Date: {bookingData.bookingDate}</p>
        <p>Check-in Date: {bookingData.checkInDate}</p>
        <p>Check-out Date: {bookingData.checkOutDate}</p>
        <p>Total Cost: {bookingData.totalCost}</p>
        <button onClick={() => openModal('roomDetail')}>Open Room Detail</button>
        <button onClick={() => openModal('editReservation')}>Edit Reservation</button>
        <button onClick={() => openModal('confirmation')}>Cancel Reservation</button>
      </div>

      {/* Room Detail Modal */}
      {isRoomDetailModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => closeModal('roomDetail')}>&times;</span>
            {/* Add room details content here */}
          </div>
        </div>
      )}

      {/* Edit Reservation Modal */}
      {isEditReservationModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => closeModal('editReservation')}>&times;</span>
            {/* Add form elements here for editing the reservation */}
            {/* E.g., Date inputs, cost updates, etc. */}
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => closeModal('confirmation')}>&times;</span>
            <p>Are you sure you want to cancel this reservation?</p>
            <button className="confirm-btn" onClick={cancelReservation}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingContainer;