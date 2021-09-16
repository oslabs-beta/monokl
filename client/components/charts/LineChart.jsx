import React from 'react';
import { Line } from 'react-chartjs-2';

//import state variable


const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Requests',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: '#018790',
      borderColor: 'rgba(75, 192, 192, 0.2)',
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

const LineChart = (props) => (
  <>
    <h1 className='title'>{props.metricName}</h1>
    <div className='lineChart'>
      <Line data={data} options={options} />
    </div>
  </>
);

export default LineChart;