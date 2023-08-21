import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from '../../StateContext';
import "./Navbar.css";

/**
 * Renders the navigation bar with links to different sections and user authentication options.
 * @component
 * @author Raneen Kakar
 * @since July 10th 2023
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar() {
  const { user, setUser, setAccessToken } = useStateContext(); 

  const handleSignOut = () => {
    setUser(null);
    setAccessToken("");
  };
  
  return (
    <nav className="nav">
      <Link to="/">LOGO</Link>
      <div className="nav__links">
        {user && <span className="nav__name">Hello, {user.role === "manager" ? "Admin" : user.first_name}</span>}
        <Link className="nav__btn" to="/rooms">Rooms</Link>
        {user && <Link className="nav__btn" to="/reservations">Reservations</Link>}
        {(user && user.role === "manager") && <Link className="nav__btn" to="/manager">Manager</Link>}
        {user ? 
          <button className="nav__btn" onClick={handleSignOut}>Sign Out</button>
          :<Link className="nav__btn" to="/signin">Sign In</Link> 
        }
      </div>
    </nav>
  );
} 

export default Navbar;