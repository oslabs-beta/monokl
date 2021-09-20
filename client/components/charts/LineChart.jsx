import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const data = {
    labels: props.x,
    datasets: [
      {
        label: "# of Responses",
        data: props.y,
        fill: false,
        backgroundColor: "#018790",
        borderColor: "rgba(75, 192, 192, 0.2)",
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

export default LineChart;
