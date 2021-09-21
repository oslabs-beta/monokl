import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
  datasets: [
    {
      label: "# of Connections",
      data: [825, 400, 865, 740, 600, 890, 540],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "black",
        "black",
        "black",
        "black",
        "black",
        "black",
      ],
      borderWidth: 1,
    },
  ]
}

const options = {
  maintainAspectRatio: false
}

const BarChart = (props) => {
  return (
    <>
      <h1>{props.metricName}</h1>
      <div className="chartDiv">
        <Bar
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default BarChart;