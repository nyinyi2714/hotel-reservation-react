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
  const [photoSrc, setPhotoSrc] = useState(`/images/${room.type.toLowerCase()}/photo-1.jpg`);

  /**
   * Changes the displayed photo in the modal.
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void}
   */
  const changePhoto = (e) => {
    setPhotoSrc(`/images/${room.type.toLowerCase()}/${e.target.id}.jpg`);
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
        <h2>{room.type}</h2>
        <div className="room-modal__photo-container">
          <img src={photoSrc} alt="room-preview--zoom" />
        </div>
        <div className="room-modal__gallery">
          <img 
            id="photo-1"
            src={`/images/${room.type.toLowerCase()}/photo-1.jpg`}
            alt="room-preview-1" 
            onClick={changePhoto}
          />
          <img
            id="photo-2"
           src={`/images/${room.type.toLowerCase()}/photo-2.jpg`}
           alt="room-preview-2" 
            onClick={changePhoto}
          />
          <img
            id="photo-3"
            src={`/images/${room.type.toLowerCase()}/photo-3.jpg`} 
            alt="room-preview-3" 
            onClick={changePhoto}
          />
          <img 
            id="photo-4"
            src={`/images/${room.type.toLowerCase()}/photo-4.jpg`} 
            alt="room-preview-4" 
            onClick={changePhoto}
          />
        </div>
        <div className="room-modal__description">
          <h3>Description</h3>
          <p>
           Discover comfort and style in our {room.type} Room. Unwind
           in a spacious room featuring a plush king-sized bed with 
           premium linens, ensuring a restful night's sleep.
          </p>

          <h4>Amenities:</h4>
            <ul className="room-modal__amenities">
              <li>A flat-screen TV</li>
              <li>High-speed Wi-Fi</li>
              <li>A well-appointed work area</li>
              <li>A Bathroom equipped with rainfall shower</li>
            </ul>
            
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