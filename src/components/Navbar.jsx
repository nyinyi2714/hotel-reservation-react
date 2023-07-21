import React from "react";
import "./Navbar.css";

export default function Navbar() {

    return(
        <nav class="nav">
         <div class="navbar">
            <div class="moto"><a href="#">Hotel Del Luna</a>
            </div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#rooms">Rooms</a></li>
                <li><a href="#ManageYourReservations">Manage Your Reservations</a></li>
                <li><a href="#Location">Location</a></li>
                <li><a href="#Manager">Manager</a></li>
                <button><a href="#Signin">Sign In</a></button>
                <button><a href="#Signout">Sign Out</a></button>
            </ul>
         </div>
      </nav> 
    );
}  
