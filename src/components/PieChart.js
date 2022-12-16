import React, { useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import random from 'random';
import {useRef, useState} from 'react';


export default function PieChart (props) {

  const [chartData, setChartData] = useState({
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
    setChartData({
      labels: ['Yes', 'No', 'No with Veto', 'Abstain'],
      datasets: [
        {
          data: props.chartData,
          backgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
          hoverBackgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
        },
      ],
    })
  }, [props.chartData])
    
      
    return(
        <Doughnut data={chartData} />
    )
} 








