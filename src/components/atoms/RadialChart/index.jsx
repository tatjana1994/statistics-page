import "./RadialChart.scss"

import React from "react"
import ReactApexChart from "react-apexcharts"

const RadialChart = () => {
  const state = {
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 250,
        type: "radialBar",
        background: "#fff",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
            },
          },
        },
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"],
    },
  }
  return (
    <div className="radial-chart-container">
      <ReactApexChart options={state.options} series={state.series} type="radialBar" height={332} />
    </div>
  )
}

export default RadialChart
