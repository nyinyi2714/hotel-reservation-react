import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";
import { useStateContext } from "../../StateContext";

/**
 * Renders the navigation bar with links to different sections and user authentication options.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 10th 2023
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { userData, setUserData, setAccessToken } = useStateContext();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNav = () => {
    setIsMobileNavOpen(prev => !prev);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const handleLogout = async () => {
    const isSuccessful = await logout();
    if(isSuccessful) {
      navigate('/signin');
      setUserData({  authenticated: false });
      setAccessToken('');
    }
  };

  return (
    <nav className="nav">
      <Link to="/"><img className="nav__logo" src="/images/logo.png" alt="logo" /></Link>
      <div className="burger-menu" onClick={handleMobileNav}>
        <span />
        <span />
        <span />
      </div>
      <div className={`nav__links ${isMobileNavOpen && "open"}`} onClick={closeMobileNav}>
        {userData?.authenticated && 
          <Link className="nav__name" to="/">
            Hello, {userData.user.firstname} 
          </Link>}
        <Link className="nav__btn" to="/rooms">Rooms</Link>
        {userData?.authenticated && <Link className="nav__btn" to="/reservations">Reservations</Link>}
        {userData?.authenticated ? 
          <button className="nav__btn" onClick={handleLogout}>Sign Out</button>
          :<Link className="nav__btn" to="/signin">Sign In</Link> 
        }
      </div>
    </nav>
  );
} 

export default Navbar;