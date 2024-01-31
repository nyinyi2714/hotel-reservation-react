import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useStateContext } from '../../StateContext';
import "./Navbar.css";

/**
 * Renders the navigation bar with links to different sections and user authentication options.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 10th 2023
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar() {
  const { userData, setUserData } = useStateContext(); 
  const { getUser, logout } = useAuth();

  useEffect(() => {
    getUser().then(userData => setUserData(userData));
  }, []);

  return (
    <nav className="nav">
      <Link to="/"><img className="nav__logo" src="/images/logo.png" alt="logo" /></Link>
      <div className="nav__links">
        {userData?.authenticated && <span className="nav__name">
          Hello, {userData.user.firstname} 
        </span>}
        <Link className="nav__btn" to="/rooms">Rooms</Link>
        {userData?.authenticated && <Link className="nav__btn" to="/reservations">Reservations</Link>}
        {userData?.authenticated ? 
          <button className="nav__btn" onClick={logout}>Sign Out</button>
          :<Link className="nav__btn" to="/signin">Sign In</Link> 
        }
      </div>
    </nav>
  );
} 

export default Navbar;