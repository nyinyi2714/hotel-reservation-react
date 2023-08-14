import React from 'react';
import {useState, useEffect} from 'react';
import "./Popup.css";


export default function Popup() {
 
 // An open or closed state is used to track the pop-up
 const [isPopupOpen, setIsPopupOpen] = useState(true);
 const [isSuccess, setIsSuccess] = useState(true);

   const hidePopup = () => {
    setIsPopupOpen(false);
  };


 // using effect to close the popup after some time
 useEffect(() => {
  const timer = setTimeout(() => {
    setIsPopupOpen(false);
  }, 3000); // correcting after this time
  return () => clearTimeout(timer); // clear the timer 
}, []);

 // shows the design of popup box
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
