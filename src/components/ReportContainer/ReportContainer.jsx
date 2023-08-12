import React, { useState } from "react";

export default function ReportContainer(props) {

  const {report} = props;
  /*const [isDeleted, setIsDeleted] = useState(false);

  function deleteReportHandler() {
    if (report.id && typeof onDelete === "function") {
      onDelete(report.id);
      setIsDeleted(true);
    } else {
      console.error("Invalid report");
    }
  }

  if (isDeleted) {
    return null;
  }*/


  return (
    <tr key={report.id}> {/*it create a table row with a unique key*/}
      <td>{report.id}</td> {/* Shows the Id of table data cell */}
      <td>{report.title}</td> {/* Shows the title of the data cell */}
      <td>{report.date}</td> {/* Shows the date for report */}
      {/*<td><button onClick={deleteReportHandler}>Delete</button></td>*/}
    </tr>
  );
}





