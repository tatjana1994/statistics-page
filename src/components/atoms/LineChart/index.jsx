import "./LineChart.scss"

import PropTypes from "prop-types"
import React from "react"
import ReactApexChart from "react-apexcharts"

const LineChart = ({ seriesData, subtitle, titleText, titleColor, categories, colors }) => {
  const state = {
    series: seriesData,

    options: {
      colors,
      markers: {
        size: 0.5,
      },

      chart: {
        background: "#fff",
        height: 120,
        width: "100%",
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          tools: {
            download: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: titleText,
        align: "left",
        offsetX: 10,
        offsetY: 8,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: titleColor,
        },
      },
      subtitle: {
        text: subtitle,
        align: "left",
        offsetX: 10,
        offsetY: 25,

        style: {
          fontSize: "12px",
          fontWeight: "bold",
          color: "#c5c4c6",
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories,
      },
    },
  }
  return (
    <div className="line-chart-container">
      <ReactApexChart options={state.options} series={state.series} type="line" height="100%" />
    </div>
  )
}

LineChart.propTypes = {
  seriesData: PropTypes.instanceOf(Array),
  categories: PropTypes.instanceOf(Array),
  subtitle: PropTypes.string,
  titleText: PropTypes.string,
  colors: PropTypes.instanceOf(Array),
  titleColor: PropTypes.string,
}

LineChart.defaultProps = {
  seriesData: [],
  categories: [],
  subtitle: "",
  titleText: "",
  colors: [],
  titleColor: "",
}

export default LineChart
