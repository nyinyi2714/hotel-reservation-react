import React from 'react';
import {useState, useEffect} from 'react';
import "./Popup.css";

/**
 * @component
 * Customizable popup component with optional success state.
 * @returns {JSX.Element}
 */
export default function Popup() {
 
 /**
   * An open or closed state is used to track the pop-up.
   * @type {boolean}
 */
 const [isPopupOpen, setIsPopupOpen] = useState(true);
 /**
   * State shows either the popup represents a success message.
   * @type {boolean}
 */
 const [isSuccess, setIsSuccess] = useState(true);

 /**
   * Using func to hide the popup by showing open state to false.
   * @returns {void}
 */
   const hidePopup = () => {
    setIsPopupOpen(false);
  };

 /**
   * Using effect hook to close the popup automatically after some time.
 */
 useEffect(() => {
  const timer = setTimeout(() => {
    setIsPopupOpen(false);
  }, 3000); // Adjusting the time as needed.
  return () => {
    clearTimeout(timer); // clear the timer.
  } 
 }, []);

 /**
   * Visibility and transformation styles for popup boxes.
   * @type {object}
 */
 const popupStyles = {
  visibility: isPopupOpen ? 'visible' : 'hidden',
  transform: isPopupOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.1)',
};

return (
 <div className="popup-container">
   <div id="popup" className="popup-message" style={popupStyles}>
        <h2>{isSuccess ? 'Success!' : 'Error!'}</h2>
        <p>{isSuccess ? 'Thank you for trusting us. We are looking forward to it.' : 'Please retry!'}</p>
        <button type="button" onClick={hidePopup}>close</button>
      </div>
    </div>
  );
}
