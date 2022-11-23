import "./LineChart.scss"

import React from "react"
import ReactApexChart from "react-apexcharts"

const LineChart = () => {
  const state = {
    series: [
      {
        name: "$",
        data: [10, 41, 35, 51, 49, 62, 69],
      },
    ],
    options: {
      markers: {
        size: 1,
      },
      chart: {
        background: "#fff",
        height: 120,
        width: "100%",
        type: "line",
        borderRadius: 6,
        style: {},

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
        text: "Analytics",
        align: "left",
        offsetX: 10,
        offsetY: 8,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#6785ff",
        },
      },
      subtitle: {
        text: "Sales Summary",
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
  }
  return (
    <div className="line-chart-container">
      <ReactApexChart options={state.options} series={state.series} type="line" height="100%" />
    </div>
  )
}
export default LineChart
