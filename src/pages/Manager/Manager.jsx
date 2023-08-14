import React, { useState } from "react";
import "./Manager.css";
import ReportContainer from "../../components/ReportContainer/ReportContainer";

export default function Manager() {

  const [containerReports, setContainerReports] = useState ([
    { id: 1, title: 'Report-1', date: '08-08-2023' },
    { id: 2, title: 'Report-2', date: '08-08-2023' },
  ]);
 
  const [data, setData] = useState('');
  const [reports, setReports] = useState(containerReports);

  const filterSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setData(searchValue);

    if (searchValue !== '') {
      const filteredReports = containerReports.filter((report) =>
        Object.values(report).some((val) => String(val).toLowerCase().includes(searchValue))
      );
      setReports(filteredReports);
    } else {
      setReports(containerReports);
    }
  };

  /*const handleDeleteReport = (idToDelete) => {
    const updatedReports = reports.filter(report => report.id !== idToDelete);
    setReports(updatedReports);
  };*/

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
            onChange={filterSearch}
            />
        </div>
        <div class="manager__new__report">
          <button className="manager__new__button">New Reports</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody clasName="manager__table">
            {reports.map(report => ( 
              <ReportContainer 
              key={report.id}
              report={report}
              /*onDelete={handleDeleteReport}*/ />
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );

}