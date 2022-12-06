import "./DashboardPage.scss"

import React, { useEffect, useState } from "react"

import { db } from "../../../firebase-config"
import BarChart from "../../atoms/BarChart"
import ChartWrapper from "../../atoms/ChartWrapper"
import GridRowItem from "../../atoms/GridRowItem"
import ImageWrapper from "../../atoms/ImageWrapper"
import LineChart from "../../atoms/LineChart"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import PieChart from "../../atoms/PieChart"
import RadialChart from "../../atoms/RadialChart"
import RowWrapper from "../../atoms/RowWrapper"
import RegularLayout from "../../layouts/RegularLayout"

const DashboardPage = () => {
  const [employees, setEmployees] = useState([])
  const [products, setProducts] = useState([])

  const fetchEmployer = async () => {
    const response = db.collection("/employees")
    const data = await response.get()
    setEmployees(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
  }
  useEffect(() => {
    fetchEmployer()
  }, [])

  const fetchProduct = async () => {
    const response = db.collection("/products")
    const data = await response.get()
    setProducts(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  const sellersHeadData = [
    { name: "Best Sellers" },
    { name: "Name" },
    { name: "Sold" },
    { name: "Sale" },
  ]

  const productsHeadData = [
    { name: "Best Selling" },
    { name: "Name" },
    { name: "Sold" },
    { name: "Price" },
  ]

  const parseBodyData = bodyData => {
    return bodyData.map(item => {
      return {
        rowData: item,
        rowItems: [
          <ImageWrapper
            image={item.avatar}
            alt="seller"
            width={46}
            height={46}
            className="seller-image"
            key="grid-row-item-0"
          />,
          <GridRowItem key="grid-row-item-1" value={`${item.first_name} ${item.last_name}`} />,
          <GridRowItem key="grid-row-item-2" value={item.items_sold} />,
          <GridRowItem key="grid-row-item-3" value={`$${item.total_profit}`} color="#6785ff" />,
        ],
      }
    })
  }

  const parseBodyDataProduct = bodyData => {
    return bodyData.map(item => {
      return {
        rowData: item,
        rowItems: [
          <ImageWrapper
            image={item.image}
            alt="product"
            width={46}
            height={46}
            className="seller-image"
            key="grid-row-item-0"
          />,
          <GridRowItem key="grid-row-item-1" value={item.name} />,
          <GridRowItem key="grid-row-item-2" value={item.sold_items} color="green" />,
          <GridRowItem key="grid-row-item-3" value={`$${item.price}`} color="#6785ff" />,
        ],
      }
    })
  }

  const topFiveSellers = employees.sort((a, b) => b.items_sold - a.items_sold).slice(0, 5)
  const topFiveProducts = products.sort((a, b) => b.sold_items - a.sold_items).slice(0, 5)

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
              bodyData={parseBodyData(topFiveSellers)}
              headData={sellersHeadData}
              highlightedHeadItem="Best Sellers"
            />

            <RowWrapper
              bodyData={parseBodyDataProduct(topFiveProducts)}
              headData={productsHeadData}
              highlightedHeadItem="Best Selling"
            />
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
