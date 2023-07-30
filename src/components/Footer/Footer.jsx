import React from "react";
import "./Footer.css";

export default function Footer() {
    return(

        <footer>
            <div class="footer_con">
                <div class="social_media">
                    <a href =""><i class="fa-brands fa-instagram"></i></a>
                    <a href =""><i class="fa-brands fa-twitter"></i></a>
                    <a href =""><i class="fa-brands fa-facebook"></i></a>
                    <a href =""><i class="fa-brands fa-youtube"></i></a>
                </div>
                <div class="footer_nav">
                    <ul>
                      <li><a href="#home">Home</a></li>
                      <li><a href="#rooms">Rooms</a></li>
                      <li><a href="#Location">Location</a></li>
                      <li><a href="#ManageYourReservations">Reservation</a></li>
                      <li><a href="#Manager">Manager</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer_low_headings">
                <p>Copyright &copy; 2023; <span class= "grey">Terms and Conditions</span></p>
            </div>
        </footer>
    );
}