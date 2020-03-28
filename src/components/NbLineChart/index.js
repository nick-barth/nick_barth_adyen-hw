import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = ({ labels, values }) => {
  var chartData = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        borderColor: "#b17acc",
        pointBackgroundColor: "#000000",
        pointBorderColor: "#000000",
        data: values,
      },
    ],
  }
  const options = {
    hover: { mode: null },
    title: {
      display: true,
      text: "Temperature over the next 5 days",
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            callback: function(value) {
              if (Number.isInteger(value)) {
                return value
              }
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return <Line data={chartData} options={options} />
}

export default LineChart
