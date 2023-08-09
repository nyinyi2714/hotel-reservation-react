import React from "react";

export default function ReportContainer(props) {

  const {report} = props;

  return (
    <tr key={report.id}> {/*it create a table row with a unique key*/}
      <td>{report.id}</td> {/* Shows the Id of table data cell */}
      <td>{report.title}</td> {/* Shows the title of the data cell */}
      <td>{report.date}</td> {/* Shows the date for report */}
    </tr>
  );
}





