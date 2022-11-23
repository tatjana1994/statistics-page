import "./UserPage.scss"

import React from "react"

import BarChart from "../../atoms/BarChart"
import ChartWrapper from "../../atoms/ChartWrapper"
import LineChart from "../../atoms/LineChart"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import PieChart from "../../atoms/PieChart"
import RadialChart from "../../atoms/RadialChart"
import RowWrapper from "../../atoms/RowWrapper"
import RegularLayout from "../../layouts/RegularLayout"

const UserPage = () => {
  return (
    <RegularLayout title="User">
      <div className="user-page-container">
        <div className="period-card">
          <PeriodTotalCard />
          <PeriodTotalCard />
          <PeriodTotalCard />
          <PeriodTotalCard />
        </div>
        <div className="charts-wrapper">
          <LineChart />
        </div>
        <div className="charts-wrapper">
          <BarChart />
        </div>

        {/* <div className="charts">
            <ChartWrapper />
            <div className="margin-bottom">
              <RadialChart />
            </div>

        
          </div> */}
      </div>
    </RegularLayout>
  )
}

export default UserPage
