import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Renders the footer section of the application, containing social media links and navigation links.
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer() {
  return (
    <footer>
      <div className="footer__content">
        <div className="social_media">
          <i class="bx bxl-instagram" />
          <i class="bx bxl-twitter" />
          <i class="bx bxl-facebook" />
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

export default Footer;