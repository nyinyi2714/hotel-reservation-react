import React, { useState } from "react";
import "./Manager.css";
import ReportContainer from "../../components/ReportContainer/ReportContainer";

export default function Manager() {

  const [reports, setReports] = useState([
    { id: 1, title: 'Report-1', date: '08-08-2023' },
    { id: 2, title: 'Report-2', date: '08-08-2023' },
  ]);

    return (
    <div className="manager__menu">
      <div className="manager__bar">
        <h2 className="manager__heading">Manager</h2>
        <ul>
          <li><button className="manager__side__bar">Dashboard</button></li>
          <li><button className="manager__side__bar">Report</button></li>
        </ul>
      </div>
      <div className="manager__search">
          <input 
          className="manager__input" 
          type="text" 
          placeholder="Search..."
          />
      </div>
      <div class="manager__new__report">
        <button className="manager__new__button">Generate New Reports</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="manager__table">
          {reports.map(report => ( 
            <tr key={report.id}> {/*it create a table row with a unique key*/}
              <td>{report.id}</td> {/* Shows the Id of table data cell */}
              <td>{report.title}</td> {/* Shows the title of the data cell */}
              <td>{report.date}</td> {/* Shows the date for report */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}