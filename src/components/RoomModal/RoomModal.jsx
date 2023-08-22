import React, { useState, useEffect } from "react";
import "./RoomModal.css";

/**
 * This component displays detailed information about a hotel room, including photos and description.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 29th 2023
 * @param {Object} props - The props passed to the RoomModal component.
 * @returns {JSX.Element} The rendered RoomModal component.
 */
function RoomModal(props) {
  const {closeRoomModal, initiateBooking, room } = props;
  const [photoSrc, setPhotoSrc] = useState(`/images/${room.name.toLowerCase()}/photo-1.jpg`);

  /**
   * Changes the displayed photo in the modal.
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void}
   */
  const changePhoto = (e) => {
    setPhotoSrc(`/images/${room.name.toLowerCase()}/${e.target.id}.jpg`);
  };

  const closeWithEsc = (e) => {
    if(e.key === "Escape") closeRoomModal();
  };

  const closeWithClickOutside = (e) => {
    if (e.target.id === "room-modal-wrapper") {
      closeRoomModal();
    }
  };

  // Adding event listeners for keyboard and click events
  useEffect(() => {
    document.addEventListener('keydown', closeWithEsc);
    document.addEventListener('click', closeWithClickOutside);

    // Removing event listeners on unmount
    return () => {
      document.removeEventListener('keydown', closeWithEsc);
      document.removeEventListener('click', closeWithClickOutside);
    };
  }, []);

  return (
    <div className="room-modal-wrapper" id="room-modal-wrapper">
      <div className="room-modal box-shadow">
        <button 
          type="button"
          onClick={closeRoomModal}
          className="room-modal__close-btn"
        >
          <i className='bx bx-x' />
        </button>
        <h2>{room.name}</h2>
        <div className="room-modal__photo-container">
          <img src={photoSrc} alt="room-preview--zoom" />
        </div>
        <div className="room-modal__gallery">
          <img 
            id="photo-1"
            src={`/images/${room.name.toLowerCase()}/photo-1.jpg`}
            alt="room-preview-1" 
            onClick={changePhoto}
          />
          <img
            id="photo-2"
           src={`/images/${room.name.toLowerCase()}/photo-2.jpg`}
           alt="room-preview-2" 
            onClick={changePhoto}
          />
          <img
            id="photo-3"
            src={`/images/${room.name.toLowerCase()}/photo-3.jpg`} 
            alt="room-preview-3" 
            onClick={changePhoto}
          />
          <img 
            id="photo-4"
            src={`/images/${room.name.toLowerCase()}/photo-4.jpg`} 
            alt="room-preview-4" 
            onClick={changePhoto}
          />
        </div>
        <div className="room-modal__description">
          <h3>Description</h3>
          <p>
          Discover comfort and style in our {room.name} King Room. Unwind
           in a spacious room featuring a plush king-sized bed with 
           premium linens, ensuring a restful night's sleep. Enjoy 
           modern amenities including a flat-screen TV, high-speed 
           Wi-Fi, and a well-appointed work area. The room boasts 
           elegant decor and large windows offering abundant natural 
           light. Indulge in the luxurious bathroom equipped with a 
           rainfall shower and complimentary toiletries.
          </p>
        </div>
        {initiateBooking && <button 
          className="btn room-modal__btn" 
          type="button"
          onClick={initiateBooking}
          id={room.id}
        >
          Book for ${room.price}
        </button>}
      </div>
    </div>
  );
}

export default RoomModal;