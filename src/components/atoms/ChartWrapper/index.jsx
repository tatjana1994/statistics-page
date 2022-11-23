import "./ChartWrapper.scss"

import React from "react"

import RadialChart from "../DonutChart"

const ChartWrapper = () => {
  return (
    <div className="chart-wrapper-container">
      <div className="chart-wrapper-title">Passengers Traffic</div>
      <div className="chart-wrapper-description">Online and Store</div>
      <RadialChart />
    </div>
  )
}

export default ChartWrapper
