import React from "react";
import { Line } from "react-chartjs-2";

//import state variable

const MultipleLineChart = (props) => {
  const data = {
    labels: props.x,
    datasets: [
      {
        label: props.label[0],
        data: props.y1,
        fill: false,
        backgroundColor: "#018790",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: props.label[1],
        data: [1, 2, 3, 4],
        fill: false,
        backgroundColor: "#db4c96",
        borderColor: "rgba(219, 76, 150, 0.2)",
      },
      {
        label: props.label[2],
        data: [2, 4, 6, 8],
        fill: false,
        backgroundColor: "#4c61db",
        borderColor: "rgba(76, 97, 219, 0.2)",
      },
      {
        label: props.label[3],
        data: [3, 6, 9, 12],
        fill: false,
        backgroundColor: "#f79a08",
        borderColor: "rgba(247, 154, 8, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <h1 className="title">{props.metricName}</h1>
      <div className="lineChart">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default MultipleLineChart;
