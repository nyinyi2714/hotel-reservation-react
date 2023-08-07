import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from '../../StateContext';
import "./Navbar.css";

export default function Navbar() {
  const { user } = useStateContext(); 
  
  return (
    <nav className="nav">
      <Link to="/">LOGO</Link>
      <div className="nav__links">
        <Link className="nav__btn" to="/">Home</Link>
        <Link className="nav__btn" to="/rooms">Rooms</Link>
        <Link className="nav__btn" to="/reservations">Reservations</Link>
        <Link className="nav__btn" to="/manager">Manager</Link>
        {user ? 
          <button className="nav__btn">Sign Out</button>
          :<Link className="nav__btn" to="/signin">Sign In</Link> 
        }
      </div>
    </nav>
  );
} 