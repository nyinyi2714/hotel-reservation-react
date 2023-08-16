import React from 'react';
import { useState, useEffect } from 'react';
import "./Popup.css";

/**
 * Display a popup message box to tell users if a process is successful or failed.
 * @component
 * @author Raneen Kakar
 * @since August 10th 2023
 * @returns {JSX.Element}
 */
function Popup() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);

  /**
    * Hide the popup message box.
    * @returns {void}
  */
  const hidePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(false);
    }, 3000); // Adjusting the time as needed.
    return () => {
      clearTimeout(timer); // clear the timer.
    }
  }, []);

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

export default Popup;
