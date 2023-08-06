import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer__content">
        <div className="social_media">
          <i className="bx bxl-instagram" />
          <i className="bx bxl-twitter" />
          <i className="bx bxl-facebook" />
        </div>
        <div className="footer_low_headings">
          <div className="top">
            <Link to="/" className="link">Home</Link>
            <span>About</span>
            <span>Services</span>
            <span>Team</span>
            <span>Contact</span>
          </div>
          <div className="bottom">
            Created by Emerald
          </div>
        </div>
      </div>
    </footer>
  );
}