import "./PieChart.scss"

import PropTypes from "prop-types"
import React from "react"
import ReactApexChart from "react-apexcharts"

const PieChart = ({ seriesData, labels, title, subtitle }) => {
  const state = {
    series: seriesData,

    options: {
      height: 250,
      legend: {
        show: false,
      },
      chart: {
        type: "pie",
        background: "#fff",
      },
      labels,
    },
  }
  return (
    <div className="pie-chart-container">
      <div className="chart-title">{title}</div>
      <div className="chart-subtitle">From {subtitle}</div>

      <ReactApexChart options={state.options} series={state.series} type="pie" />
    </div>
  )
}

PieChart.propTypes = {
  seriesData: PropTypes.instanceOf(Array),
  subtitle: PropTypes.string,
  labels: PropTypes.instanceOf(Array),
  title: PropTypes.string,
}

PieChart.defaultProps = {
  seriesData: [],
  subtitle: "",
  labels: [],
  title: "",
}

export default PieChart
