import React, { useState } from "react";
import "./Manager.css";
import ReportContainer from "../../components/ReportContainer/ReportContainer";

export default function Manager() {

  return (
    <div className="manager__menu">
      <div className="manager__bar">
        <h2 className="manager__heading">Manager</h2>
        <ul>
          <li><button className="manager__side__bar">Dashboard</button></li>
          <li><button className="manager__side__bar">Report</button></li>
        </ul>
      </div>
      <div>
        <div className="manager__search">
          <input
            className="manager__input"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="manager__new__report">
          <button className="manager__new__button">New Reports</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody className="manager__table">
            {/* {reports.map(report => (
              <ReportContainer
                key={report.id}
                report={report}
              />
            ))
            } */}
          </tbody>
        </table>
      </div>
    </div>
  );

}