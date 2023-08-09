import React from "react";

export default function ReportContainer(props) {

  return (
    <div>
      <h2>{props.report.title}</h2>
      <p> Date: {props.report.date}</p>
  </div>
  );
}





