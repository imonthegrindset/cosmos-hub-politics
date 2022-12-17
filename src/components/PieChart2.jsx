import React, { useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import random from 'random';
import {useRef, useState} from 'react';


export default function PieChart2 (props) {

  const [chartData2, setChartData2] = useState({
    labels: ['Yes', 'No', 'No with Veto', 'Abstain'],
    datasets: [
      {
        data: [2, 3, 4, 5],
        backgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
        hoverBackgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
      },
    ],
  });


  useEffect(() => {
    setChartData2({
      labels: ['Yes', 'No', 'No with Veto', 'Abstain'],
      datasets: [
        {
          data: props.chartData2,
          backgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
          hoverBackgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
        },
      ],
    })
  }, [props.chartData2])
    
      
    return(
        <Doughnut data={chartData2} />
    )
} 