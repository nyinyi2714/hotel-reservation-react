import React from "react";

/**
 * @component
 * Renders a table row containing report information.
 * @param {Object} props - The component props.
 * @param {Object} props.report - The report object containing report details.
 * @param {number} props.report.id - The unique identifier for the report.
 * @param {string} props.report.title - The title of the report.
 * @param {string} props.report.date - The date of the report.
 * @returns {JSX.Element} The rendered ReportContainer component.
 */
function ReportContainer(props) {
  const {report} = props;

  return (
    <tr key={report.id}> {/*it create a table row with a unique key*/}
      <td>{report.id}</td> {/* Shows the Id of table data cell */}
      <td>{report.title}</td> {/* Shows the title of the data cell */}
      <td>{report.date}</td> {/* Shows the date for report */}
    </tr>
  );
}

export default ReportContainer;





