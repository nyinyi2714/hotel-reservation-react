import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomModal from "../RoomModal/RoomModal";
import "./RoomContainer.css";
const bookingData = {
  bookingDate: "July 27, 2023",
  checkInDate: "August 1, 2023",
  checkOutDate: "August 5, 2023",
  totalCost: "$500",
};

function createBookingContainer() {
  const bookingContainer = document.getElementById("bookingContainer");

  const bookingInfo = document.createElement("div");
  bookingInfo.classList.add("booking-info");

  const bookingDate = document.createElement("p");
  bookingDate.textContent = "Booking Date: " + bookingData.bookingDate;
  bookingInfo.appendChild(bookingDate);

  const checkInDate = document.createElement("p");
  checkInDate.textContent = "Check-in Date: " + bookingData.checkInDate;
  bookingInfo.appendChild(checkInDate);

  const checkOutDate = document.createElement("p");
  checkOutDate.textContent = "Check-out Date: " + bookingData.checkOutDate;
  bookingInfo.appendChild(checkOutDate);

  const totalCost = document.createElement("p");
  totalCost.textContent = "Total Cost: " + bookingData.totalCost;
  bookingInfo.appendChild(totalCost);

  const roomDetailBtn = document.createElement("button");
  roomDetailBtn.textContent = "Open Room Detail";
  roomDetailBtn.onclick = () => openModal("roomDetailModal");
  bookingInfo.appendChild(roomDetailBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Reservation";
  editBtn.onclick = () => openModal("editReservationModal");
  bookingInfo.appendChild(editBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel Reservation";
  cancelBtn.onclick = () => openModal("confirmationModal");
  bookingInfo.appendChild(cancelBtn);

  bookingContainer.appendChild(bookingInfo);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function cancelReservation() {
  // Perform reservation cancellation logic here
  // E.g., send cancellation request to server
  alert("Reservation cancelled successfully!");
  closeModal("confirmationModal");
}

// Create the booking container on page load
window.onload = createBookingContainer;