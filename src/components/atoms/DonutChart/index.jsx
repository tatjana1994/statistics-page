import "./DonutChart.scss"

import React from "react"
import Chart from "react-apexcharts"

const DonutChart = () => {
  const state = {
    series: [24, 55],

    options: {
      labels: ["Apple", "Mango"],
      colors: ["#6684fe", "#ec68a7"],
      plotOptions: {
        pie: {
          donut: {
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
      <Chart options={state.options} series={state.series} type="donut" height="250px" />
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

export default DonutChart
