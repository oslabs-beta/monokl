import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart() {
  // fetch("http://localhost:9090/api/v1/query?query=process_cpu_seconds_total")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <>
      <h1>Bar Chart</h1>
      <div className="chartDiv">
        <Bar
          data={{
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [3, 3, 45, 2, 5, 7],
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
            ],
          }}
          // height={100}
          // width={200}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </>
  );
}

export default BarChart;