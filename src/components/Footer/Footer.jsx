import React from "react";
import "./Footer.css";

export default function Footer() {
    return(

        <footer className="footer_view">
            <div className="footer_con">
                <div className="social_media">
                    <a href =""><i className="fa-brands fa-instagram"></i></a>
                    <a href =""><i className="fa-brands fa-twitter"></i></a>
                    <a href =""><i className="fa-brands fa-facebook"></i></a>
                    <a href =""><i className="fa-brands fa-youtube"></i></a>
                </div>
                <div className="footer_nav">
                    <ul>
                      <li><a href="#home">Home</a></li>
                      <li><a href="#rooms">Rooms</a></li>
                      <li><a href="#Location">Location</a></li>
                      <li><a href="#ManageYourReservations">Reservation</a></li>
                      <li><a href="#Manager">Manager</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer_low_headings">
                <p>Copyright &copy; 2023; <span className= "grey">Terms and Conditions</span></p>
            </div>
        </footer>
    );
}