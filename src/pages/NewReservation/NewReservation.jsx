import React from "react";
import StayForm from "../../components/StayForm/StayForm";
import "./NewReservation.css";

export default function NewReservation() {
  return (
    <div className="new-reservation">
      <StayForm />
      <div className="new-reservation__receipt">
        <h2>Stay and Guest Details</h2>
        
      </div>
    </div>
  );
}