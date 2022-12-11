import "./ChartWrapper.scss"

import PropTypes from "prop-types"
import React from "react"

import DonutChart from "../DonutChart"

const ChartWrapper = ({ seriesData, colors, title, subtitle, labels }) => {
  return (
    <div className="chart-wrapper-container">
      <div style={{ whiteSpace: "pre-line" }} className="chart-wrapper-title">
        {title}
      </div>
      <div className="chart-wrapper-description">{subtitle}</div>
      <DonutChart seriesData={seriesData} colors={colors} labels={labels} />
    </div>
  )
}

ChartWrapper.propTypes = {
  seriesData: PropTypes.instanceOf(Array),
  labels: PropTypes.instanceOf(Array),
  colors: PropTypes.instanceOf(Array),
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

ChartWrapper.defaultProps = {
  seriesData: [],
  labels: [],
  colors: [],
  title: "",
  subtitle: "",
}

export default ChartWrapper
