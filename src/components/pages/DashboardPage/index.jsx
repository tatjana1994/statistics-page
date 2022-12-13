import "./DashboardPage.scss"

import _ from "lodash"
import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getProducts } from "../../../redux/products/productsActions"
import { getSellers } from "../../../redux/sellers/sellersActions"
import { getTotals } from "../../../redux/totals/totalsActions"
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
  const dispatch = useDispatch()

  const [allProducts, allSellers, allTotals, productsLoading, sellersLoading, totalsLoading] =
    useSelector(({ products, sellers, totals }) => [
      products.allProducts,
      sellers.allSellers,
      totals.allTotals,
      products.loading,
      sellers.loading,
      totals.loading,
    ])

  const loading = useMemo(
    () => productsLoading || sellersLoading || totalsLoading,
    [productsLoading, sellersLoading, totalsLoading],
  )

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getSellers())
    dispatch(getTotals())
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

  const clonedSellers = _.cloneDeep(allSellers)
  const clonedProducts = _.cloneDeep(allProducts)

  const topFiveSellers = clonedSellers.sort((a, b) => b.items_sold - a.items_sold).slice(0, 5)
  const topFiveProducts = clonedProducts.sort((a, b) => b.sold_items - a.sold_items).slice(0, 5)

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
                  value={`$${allTotals[0]?.total_earnings}`}
                  date={allTotals[0]?.date}
                  percentage={allTotals[0]?.total_earning_percentage}
                />
                <PeriodTotalCard
                  title="Total Sales"
                  date={allTotals[0]?.date}
                  value={allTotals[0]?.total_sales}
                  percentage={allTotals[0]?.total_sales_percentage}
                />
                <PeriodTotalCard
                  title="Total Online Sales"
                  date={allTotals[0]?.date}
                  value={allTotals[0]?.total_online_sales}
                  percentage={allTotals[0]?.total_online_sales_percentage}
                />
                <PeriodTotalCard
                  title="Total Store Sales"
                  date={allTotals[0]?.date}
                  value={allTotals[0]?.total_store_sales}
                  percentage={allTotals[0]?.total_store_sales_percentage}
                />
              </div>

              <div className="top-row-items-wrapper">
                <LineChart
                  titleText="Total Earnings"
                  titleColor="#6785ff"
                  subtitle="From Jul - Oct 2022"
                  colors={["#6785ff"]}
                  categories={["Jul", "Aug", "Sep", "Oct"]}
                  seriesData={[
                    { data: allTotals[0]?.total_earnings_monthly, name: "Total Earning" },
                  ]}
                />
                <BarChart
                  titleText="Total Online Sales"
                  titleColor="#eaaa53"
                  colors={["#eaaa53"]}
                  subtitleText="From Jul - Oct 2022"
                  seriesData={[
                    { data: allTotals[0]?.total_online_sales_monthly, name: "Total Online Sale" },
                  ]}
                  categories={["Jul", "Aug", "Sep", "Oct"]}
                />
              </div>
            </div>

            <ChartWrapper
              seriesData={[allTotals[0]?.total_online_earning, allTotals[0]?.total_store_earning]}
              colors={["#6684fe", "#ec68a7"]}
              title={`Total Earnings  
              Online/Store`}
              subtitle={`From ${allTotals[0]?.date}`}
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
              seriesData={[{ data: allTotals[0]?.total_sales_monthly, name: "Total Sale" }]}
            />
            <BarChart
              titleText="Total Store Sales"
              titleColor="#c4292e"
              colors={["#c4292e"]}
              subtitleText="From Jul - Oct 2022"
              seriesData={[
                { data: allTotals[0]?.total_store_sales_monthly, name: "Total Store Sale" },
              ]}
              categories={["Jul", "Aug", "Sep", "Oct"]}
            />

            <ChartWrapper
              seriesData={[allTotals[0]?.total_online_sales, allTotals[0]?.total_store_sales]}
              colors={["#E65F5C", "#B5D99C"]}
              title={`Total Sales 
                       Online/Store`}
              subtitle={`From ${allTotals[0]?.date}`}
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
              subtitle={allTotals[0]?.date}
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
              subtitle={allTotals[0]?.date}
            />
          </div>
        </div>
      )}
    </RegularLayout>
  )
}

export default DashboardPage
