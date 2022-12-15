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
            backgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
            hoverBackgroundColor: ['#A7FF86', '#FF8686', '#FF3C3C', '#D5D5D5'],
          },
        ],
      });
      
    return(
        <Doughnut data={data.current} />
    )
} 








