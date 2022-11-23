import "./DashboardPage.scss"

import React from "react"

import users from "../../../users"
import BarChart from "../../atoms/BarChart"
import ChartWrapper from "../../atoms/ChartWrapper"
import LineChart from "../../atoms/LineChart"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import PieChart from "../../atoms/PieChart"
import RadialChart from "../../atoms/RadialChart"
import RowWrapper from "../../atoms/RowWrapper"
import RegularLayout from "../../layouts/RegularLayout"

const DashboardPage = () => {
  const topFiveUsers = users.sort((a, b) => b.sold - a.sold).slice(0, 5)

  const usersHeadData = ["Best Sellers", "Name", "Sold", "Sale"]

  return (
    <RegularLayout title="Dashboard">
      <div className="dashboard-page-container">
        <div className="dashboard-page-wrapper">
          <div className="cards-and-charts-wrapper">
            <div className="period-card">
              <PeriodTotalCard />
              <PeriodTotalCard />
              <PeriodTotalCard />
              <PeriodTotalCard />
            </div>
            <div className="charts-wrapper">
              <LineChart />
              <BarChart />
            </div>

            <RowWrapper
              data={topFiveUsers}
              headData={usersHeadData}
              highlightedHeadItem="Best Sellers"
            />

            <RowWrapper data={topFiveUsers} headData={usersHeadData} />
          </div>
          <div className="charts">
            <ChartWrapper />
            <div className="margin-bottom">
              <RadialChart />
            </div>

            <PieChart />
          </div>
        </div>
      </div>
    </RegularLayout>
  )
}

export default DashboardPage
