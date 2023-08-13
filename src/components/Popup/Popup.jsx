import React from 'react';
import useState from 'react';
import "./Popup.css";


export default function Popup() {
 
 // An open or closed state is used to track the pop-up
 const [isPopupOpen, setIsPopupOpen] = useState(false);


 // show the popup
 const showPopup = () => {
   // Ensure the isPopupOpen state is true in order for the popup to appear
   setIsPopupOpen(true);
 };


 // hide the popup
 const hidePopup = () => {
   // Ensure the isPopupOpen state is false in order for the popup to close
   setIsPopupOpen(false);
 };


  return (
    <div className="popup-container">
      <button type="submit" className="popup-buton"  onClick={showPopup} >Book Reservation</button>
      <div id="popup" className="popup-message">
        <h2>Success!</h2>
        <p>Thank you for trusting us. We are looking forward to it.</p>
        <button type="button" onClick={hidePopup} >close</button>
      </div>
      <div id="popup" className="popup-message">
        <h2>Error!</h2>
        <p>Please retry!</p>
        <button type="button" onClick={hidePopup} >close</button>
      </div>
    </div>
  );
}
