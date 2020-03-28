import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import moment from "moment"

const LineChart = ({ labels, values }) => {
  var chartData = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        borderColor: "#b17acc",
        pointBackgroundColor: "#663399",
        pointBorderColor: "#663399",
        data: values,
      },
    ],
  }
  const options = {
    hover: { mode: null },
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
