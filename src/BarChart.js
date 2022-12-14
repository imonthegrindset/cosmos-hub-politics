import React from 'react';
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import {useRef} from 'react'



const HorizontalBarChart = (props) => {

    const data = useRef({
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'My First Dataset',
            backgroundColor: 'blue',
            borderColor: 'darkblue',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55]
          }
        ]
      });
      
      const options = useRef({
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      });

  return (
    <Bar
      data={data.current}
      options={options.current}
    />
  );
};

export default HorizontalBarChart;
