import React, { useState } from "react";
import "./Manager.css";
import DatePicker from "react-datepicker";
import ReportContainer from "../../components/ReportContainer/ReportContainer";

function Manager() {
    
  const [selectMonthYear, setSelectMonthYear] = useState(null);

  const handleMonthYear = (date) => {
    setSelectMonthYear(date);
  };
  

    return (
    <div className="manager__menu">
      <div className="manager__bar">
        <h2 className="manager__heading">Manager</h2>
        <ul>
          <li><button className="manager__side__bar">Report</button></li>
        </ul>
      </div>
      <div>
        <div class="manager__new__report">
          <button className="manager__new__button">Generate Reports</button>
          <DatePicker  className="manager__new__button input"
            selected={selectMonthYear}
            onChange={handleMonthYear}
            placeholderText="Select Month and Year"
            dateFormat="MMMM yyyy"
            showMonthYearPicker
          />
       </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profit</th>
              <th>Booked</th>
              <th>Cancellations</th>
            </tr>
          </thead>
          <tbody clasName="manager__table">
            {/*reports.map(report => ( 
              <ReportContainer 
              key={report.id}
              report={report}
             />
            ))
            */}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Manager;