import React, { useState } from "react";
import { useStateContext } from "../../StateContext";
import { backendUrl } from "../../config";
import "./Manager.css";

/**
 * Manager component for generating and displaying monthly reports.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since August 18th 2023
 * @returns {JSX.Element} The JSX element for generating and displaying reports.
 */
function Manager() {
  const [report, setReport] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false); 

  const messages = {
    askMonthAndYear: "Please Select Month and Year to generate a monthly report.",
    generatingReport: "Generating Report. Please wait a few seconds...",
    error: "Report couldn't be generated for the selected month and year",
  };
  const [message, setMessage] = useState(messages.askMonthAndYear);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const { accessToken } = useStateContext();

  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const generateReport = async () => {
    // Sending report dates to backend API
    setIsGeneratingReport(true);
    setMessage(messages.generatingReport);
    try {
      const response = await fetch(`${backendUrl}/show/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          year: year,
          month: month+1,
        }),
      });
  
      const responseData = await response.json();
      setReport(responseData);
  
      if (response.ok) {
        console.log(responseData);
      } else {
        console.error("Generate Report Failed:", responseData.error);
        setMessage(messages.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage(messages.error);
    }
    setIsGeneratingReport(false);
  };

  return (
    <div className="manager">
      <h1>Manager Portal</h1>
      <button 
        className="manager__btn"
        type="button" 
        onClick={generateReport}
      >
        Generate Report
      </button>
      <div className="manager__date-input">
        <label>Year:</label>
        <select className="dropdown" value={year} onChange={handleYearChange}>
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>

        <label>Month:</label>
        <select className="dropdown" value={month} onChange={handleMonthChange}>
          {months.map((monthOption, index) => (
            <option key={monthOption} value={index}>
              {monthOption}
            </option>
          ))}
        </select>
      </div>
      {report ? 
      <div className="manager__report">
        <h2>Report For {months[month]}, {year}</h2>
        <table className="manager__report-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reservations Booked</td>
            <td>{report.reservations_booked}</td>
          </tr>
          <tr>
            <td>Cancelled Reservations</td>
            <td>{report.cancelled_reservation}</td>
          </tr>
          <tr>
            <td>Active Reservations</td>
            <td>{report.active_reservations}</td>
          </tr>
          <tr>
            <td>New User Registered</td>
            <td>{report.user_registered}</td>
          </tr>
          <tr>
            <td>Month Total Revenue</td>
            <td>{report.month_total_profit} $</td>
          </tr>
        </tbody>
      </table>
      </div> :
      <div className="manager__message">
        {message}
      </div>
      }
    </div>
  );

}

export default Manager;