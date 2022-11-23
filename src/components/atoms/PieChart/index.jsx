import "./PieChart.scss"

import React from "react"
import ReactApexChart from "react-apexcharts"

const PieChart = () => {
  const state = {
    series: [44, 55, 13, 43, 22],

    options: {
      legend: {
        show: false,
      },
      chart: {
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    },
  }
  return (
    <div className="pie-chart-container">
      <ReactApexChart options={state.options} series={state.series} type="pie" height={332} />
    </div>
  )
}

export default PieChart
