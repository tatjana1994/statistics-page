import "./BarChart.scss"

import PropTypes from "prop-types"
import React from "react"
import ReactApexChart from "react-apexcharts"

const BarChart = ({ seriesData, categories, titleText, subtitleText, titleColor, colors }) => {
  const state = {
    series: seriesData,
    options: {
      colors,
      markers: {
        size: 1,
      },
      chart: {
        background: "#fff",
        height: 240,
        width: "100%",
        type: "bar",

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
        text: subtitleText,
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
    <div className="bar-chart-container">
      <ReactApexChart options={state.options} series={state.series} type="bar" height="100%" />
    </div>
  )
}

BarChart.propTypes = {
  seriesData: PropTypes.instanceOf(Array),
  categories: PropTypes.instanceOf(Array),
  subtitleText: PropTypes.string,
  titleText: PropTypes.string,
  colors: PropTypes.instanceOf(Array),
  titleColor: PropTypes.string,
}

BarChart.defaultProps = {
  seriesData: [],
  categories: [],
  subtitleText: "",
  titleText: "",
  colors: [],
  titleColor: "",
}

export default BarChart
