import "./DonutChart.scss"

import PropTypes from "prop-types"
import React from "react"
import Chart from "react-apexcharts"

const DonutChart = ({ seriesData, colors, labels }) => {
  const state = {
    series: seriesData,

    options: {
      labels,
      colors,
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                fontSize: "20px",
                fontWeight: "bold",
                color: "#6785ff",
              },
            },
          },
        },
      },
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
    },
  }

  return (
    <div className="donut-chart-container">
      <Chart options={state.options} series={state.series} type="donut" />
      <div className="legend-wrapper">
        {state.options.labels.map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: state.options.colors[index] }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

DonutChart.propTypes = {
  seriesData: PropTypes.instanceOf(Array),
  labels: PropTypes.instanceOf(Array),
  colors: PropTypes.instanceOf(Array),
}

DonutChart.defaultProps = {
  seriesData: [],
  labels: [],
  colors: [],
}

export default DonutChart
