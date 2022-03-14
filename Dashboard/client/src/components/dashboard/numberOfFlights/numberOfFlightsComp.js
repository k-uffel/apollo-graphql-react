import React from "react";
import "./numberOfFlightsStyle.css";
//import Chart from "chart.js";
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function NumberOfFlightsComp(props) {
    const options = {
        responsive: true,
        title: {
            display: false,
            maintainAspectRatio: false,
            text: 'Number of Flights per Year',
        }
    }

    const labels = props.chartDataset.labels;
    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Flights per Year',
                data: props.chartDataset.dataset,
                backgroundColor: "Red",
                borderColor: "Blue",
                tension: 0.5,
                fill: false,
          }
      ]
    }
   return (
        <div className="chart-container" >
            <Line options={options} data={data} />
        </div>
    )
};