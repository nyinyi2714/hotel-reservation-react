import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./RoomModal.css";

export default function RoomModal(props) {
  const {closeRoomModal} = props;
  const roomModal = useRef();
  const [photoSrc, setPhotoSrc] = useState("/images/room-1/photo-1.jpg");

  const changePhoto = (e) => {
    setPhotoSrc(`/images/room-1/${e.target.id}.jpg`);
  };

  const closeWithEsc = (e) => {
    if(e.key === "Escape") closeRoomModal();
  };

  const closeWithClickOutside = (e) => {
    if (e.target.id === "room-modal-wrapper") {
      closeRoomModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeWithEsc);
    document.addEventListener('click', closeWithClickOutside);

    return () => {
      document.removeEventListener('keydown', closeWithEsc);
      document.removeEventListener('click', closeWithClickOutside);
    };
  }, []);

  return (
    <div className="room-modal-wrapper" id="room-modal-wrapper">
      <div className="room-modal box-shadow">
        <button 
          onClick={closeRoomModal}
          className="room-modal__close-btn"
        >
          <i className='bx bx-x' />
        </button>
        <h2>Hotel Room Title</h2>
        <div className="room-modal__photo-container">
          <img src={photoSrc} alt="room-preview--zoom" />
        </div>
        <div className="room-modal__gallery">
          <img 
            id="photo-1"
            src="/images/room-1/photo-1.jpg" 
            alt="room-preview-1" 
            onClick={changePhoto}
          />
          <img
            id="photo-2"
           src="/images/room-1/photo-2.jpg" 
           alt="room-preview-2" 
            onClick={changePhoto}
          />
          <img
            id="photo-3"
            src="/images/room-1/photo-3.jpg" 
            alt="room-preview-3" 
            onClick={changePhoto}
          />
          <img 
            id="photo-4"
            src="/images/room-1/photo-4.jpg" 
            alt="room-preview-4" 
            onClick={changePhoto}
          />
        </div>
        <div className="room-modal__description">
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nemo itaque tenetur quidem vitae facere, dicta omnis aperiam 
            quod praesentium ducimus, blanditiis porro ratione? Accusamus
            dolorum cum, consequatur sed beatae nam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nemo itaque tenetur quidem vitae facere, dicta omnis aperiam 
            quod praesentium ducimus, blanditiis porro ratione? Accusamus
            dolorum cum, consequatur sed beatae nam?
          </p>
        </div>
        <Link className="btn room-modal__btn" to="reservation/new">
          Book Now for $137
        </Link>
      </div>
    </div>
  );
}