import React from "react";
import "./Manager.css";

export default function Manager() {

    const Sidebar = () => {
      return (
      <div className="manager__bar">
        <h2 className="manager__heading">Manager</h2>
        <ul>
          <li><button className="manager__side__bar">Dashboard</button></li>
          <li><button className="manager__side__bar">Report</button></li>
        </ul>
      </div>
      );
    }

    const Searchbar = () => {
      return(
        <div className="manager__search">
          <input className="manager__input" type="text" placeholder="Search..."/>
        </div>
      );
    }

    return (
    <div className="manager__menu">
      <Searchbar/>
      <Sidebar/>
    </div>

  );

}