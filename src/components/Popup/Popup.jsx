import React from 'react';
import {useState} from 'react';
import "./Popup.css";


export default function Popup() {
 
 // An open or closed state is used to track the pop-up
 const [isPopupOpen, setIsPopupOpen] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 // show the popup
 const showPopup = (success) =>{
  setIsSuccess(success);
  // Ensure the isPopupOpen state is true in order for the popup to appear
   setIsPopupOpen(true);

 };

 // hide the popup
 const hidePopup = () => {
   // Ensure the isPopupOpen state is false in order for the popup to close
   setIsPopupOpen(false);
 };

 // shows the design of popup box
 const popupStyles = {
  visibility: isPopupOpen ? 'visible' : 'hidden',
  transform: isPopupOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.1)',
};

return (
 <div className="popup-container">
   <button type="button" className="popup-button" onClick={() => showPopup(true)}>Book Reservation</button>
   <div id="popup" className="popup-message" style={popupStyles}>
        <h2>{isSuccess ? 'Success!' : 'Error!'}</h2>
        <p>{isSuccess ? 'Thank you for trusting us. We are looking forward to it.' : 'Please retry!'}</p>
        <button type="button" onClick={hidePopup}>close</button>
      </div>
    </div>
  );
}
