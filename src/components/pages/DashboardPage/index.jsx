import "./DashboardPage.scss"

import React, { useEffect, useState } from "react"

import { db } from "../../../firebase-config"
import BarChart from "../../atoms/BarChart"
import ChartWrapper from "../../atoms/ChartWrapper"
import GridRowItem from "../../atoms/GridRowItem"
import ImageWrapper from "../../atoms/ImageWrapper"
import LineChart from "../../atoms/LineChart"
import Loading from "../../atoms/Loading"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import PieChart from "../../atoms/PieChart"
import RowWrapper from "../../atoms/RowWrapper"
import RegularLayout from "../../layouts/RegularLayout"

const DashboardPage = () => {
  const [employees, setEmployees] = useState([])
  const [products, setProducts] = useState([])
  const [totals, setTotals] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployer = async () => {
    const response = db.collection("/employees")
    const data = await response.get()
    setEmployees(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
    setLoading(false)
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
    setLoading(false)
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchTotals = async () => {
    const response = db.collection("/totals")
    const data = await response.get()
    setTotals(
      data.docs.map(item => {
        return item.data()
      }),
    )
    setLoading(false)
  }
  useEffect(() => {
    fetchTotals()
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

  const getFiveItems = (data, field) => {
    return data.map(item => item[field])
  }

  return (
    <RegularLayout title="Dashboard">
      {loading ? (
        <Loading className="loading" />
      ) : (
        <div className="dashboard-page-container">
          <div className="top-row-wrapper">
            <div className="top-row-left-side-wrapper">
              <div className="top-row-items-wrapper">
                <PeriodTotalCard
                  title="Total Earnings"
                  value={`$${totals[0]?.total_earnings}`}
                  date={totals[0]?.date}
                  percentage={totals[0]?.total_earning_percentage}
                />
                <PeriodTotalCard
                  title="Total Sales"
                  date={totals[0]?.date}
                  value={totals[0]?.total_sales}
                  percentage={totals[0]?.total_sales_percentage}
                />
                <PeriodTotalCard
                  title="Total Online Sales"
                  date={totals[0]?.date}
                  value={totals[0]?.total_online_sales}
                  percentage={totals[0]?.total_online_sales_percentage}
                />
                <PeriodTotalCard
                  title="Total Store Sales"
                  date={totals[0]?.date}
                  value={totals[0]?.total_store_sales}
                  percentage={totals[0]?.total_store_sales_percentage}
                />
              </div>

              <div className="top-row-items-wrapper">
                <LineChart
                  titleText="Total Earnings"
                  titleColor="#6785ff"
                  subtitle="From Jul - Oct 2022"
                  colors={["#6785ff"]}
                  categories={["Jul", "Aug", "Sep", "Oct"]}
                  seriesData={[{ data: totals[0]?.total_earnings_monthly, name: "Total Earning" }]}
                />
                <BarChart
                  titleText="Total Online Sales"
                  titleColor="#eaaa53"
                  colors={["#eaaa53"]}
                  subtitleText="From Jul - Oct 2022"
                  seriesData={[
                    { data: totals[0]?.total_online_sales_monthly, name: "Total Online Sale" },
                  ]}
                  categories={["Jul", "Aug", "Sep", "Oct"]}
                />
              </div>
            </div>

            <ChartWrapper
              seriesData={[totals[0]?.total_online_earning, totals[0]?.total_store_earning]}
              colors={["#6684fe", "#ec68a7"]}
              title={`Total Earnings  
              Online/Store`}
              subtitle={`From ${totals[0]?.date}`}
              labels={["Online", "Store"]}
            />
          </div>

          <div className="bottom-row-wrapper">
            <LineChart
              titleText="Total Sales"
              titleColor="#20b945"
              subtitle="From Jul - Oct 2022"
              colors={["#20b945"]}
              categories={["Jul", "Aug", "Sep", "Oct"]}
              seriesData={[{ data: totals[0]?.total_sales_monthly, name: "Total Sale" }]}
            />
            <BarChart
              titleText="Total Store Sales"
              titleColor="#c4292e"
              colors={["#c4292e"]}
              subtitleText="From Jul - Oct 2022"
              seriesData={[
                { data: totals[0]?.total_store_sales_monthly, name: "Total Store Sale" },
              ]}
              categories={["Jul", "Aug", "Sep", "Oct"]}
            />

            <ChartWrapper
              seriesData={[totals[0]?.total_online_sales, totals[0]?.total_store_sales]}
              colors={["#E65F5C", "#B5D99C"]}
              title={`Total Sales 
                       Online/Store`}
              subtitle={`From ${totals[0]?.date}`}
              labels={["Online", "Store"]}
            />
          </div>

          <div className="bottom-row-wrapper">
            <RowWrapper
              bodyData={parseBodyData(topFiveSellers)}
              headData={sellersHeadData}
              highlightedHeadItem="Best Sellers"
            />
            <PieChart
              seriesData={getFiveItems(topFiveSellers, "total_profit")}
              labels={getFiveItems(topFiveSellers, "first_name")}
              title="Best Sellers"
              subtitle={totals[0]?.date}
            />
          </div>

          <div className="bottom-row-wrapper">
            <RowWrapper
              bodyData={parseBodyDataProduct(topFiveProducts)}
              headData={productsHeadData}
              highlightedHeadItem="Best Selling"
            />

            <PieChart
              seriesData={getFiveItems(topFiveProducts, "sold_items")}
              labels={getFiveItems(topFiveProducts, "name")}
              title="Best Selling Products"
              subtitle={totals[0]?.date}
            />
          </div>
        </div>
      )}
    </RegularLayout>
  )
}

export default DashboardPage
