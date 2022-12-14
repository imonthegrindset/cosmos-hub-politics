import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import random from 'random';
import {useRef} from 'react';


export default function PieChart (props) {
    
    const data = useRef({
        labels: ['Yes', 'No', 'No with Veto', 'Abstain'],
        datasets: [
          {
            data: [
              random.int(1, 100),
              random.int(1, 100),
              random.int(1, 100),
              random.int(1, 100),
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'black'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'black'],
          },
        ],
      });
      
    return(
        <Doughnut data={data.current} />
    )
} 








