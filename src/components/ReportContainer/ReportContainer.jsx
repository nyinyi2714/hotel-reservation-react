import React, { useState } from "react";

export default function ReportContainer(props) {

  const { report } = props;

  return (
    <tr key={report.id}>
      <td>{report.id}</td>
      <td>{report.title}</td>
      <td>{report.date}</td>
    </tr>
  );
}





