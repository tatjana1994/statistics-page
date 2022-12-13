import "./SellerPage.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { getExtendedSeller, getSeller } from "../../../redux/sellers/sellersActions"
import BarChart from "../../atoms/BarChart"
import ImageWrapper from "../../atoms/ImageWrapper"
import LineChart from "../../atoms/LineChart"
import Loading from "../../atoms/Loading"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import RegularLayout from "../../layouts/RegularLayout"

const SellerPage = () => {
  const [selectedSeller, extendedSeller, loading] = useSelector(({ sellers }) => [
    sellers.selectedSeller,
    sellers.extendedSeller,
    sellers.loading,
  ])

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getSeller(id))
    dispatch(getExtendedSeller(id))
  }, [])

  const totalEarned = array => {
    return (
      array &&
      array.reduce((a, b) => {
        return a + b
      })
    )
  }

  return (
    <RegularLayout title="Seller">
      {loading ? (
        <Loading className="loading" />
      ) : (
        <div className="seller-page-container">
          <div className="seller-info-container">
            <ImageWrapper
              image={selectedSeller.avatar}
              alt="seller"
              width={120}
              height={120}
              className="seller-image"
            />
            <div className="seller-info-wrapper">
              <div className="info">
                <div className="title">Name: </div>
                {selectedSeller.first_name} {selectedSeller.last_name}
              </div>
              <div className="info">
                <div className="title">Phone number:</div> {selectedSeller.phone_number}
              </div>

              <div className="info">
                <div className="title">Email:</div> {selectedSeller.email_address}
              </div>
            </div>
          </div>

          <div className="seller-period-card">
            <PeriodTotalCard
              date={extendedSeller.date}
              percentage={extendedSeller.percentageOfTotalEarned}
              title="Total Earned"
              value={`$${totalEarned(extendedSeller.earningsPerMonth)}`}
              valueColor="#ec68a7"
            />
            <LineChart
              seriesData={[{ name: "Earned per month", data: extendedSeller.earningsPerMonth }]}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              titleText="Analysis earnings"
              subtitle="Total earnings"
              colors={["#ec68a7"]}
              titleColor="#ec68a7"
            />
          </div>

          <div className="seller-period-card">
            <PeriodTotalCard
              date={extendedSeller.date}
              title="Total Sold"
              value={totalEarned(extendedSeller.soldPerMonth)}
              valueColor="#f39005"
              percentage={extendedSeller.percentageOfTotalSold}
            />
            <BarChart
              seriesData={[{ name: "Sold per month", data: extendedSeller.soldPerMonth }]}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              colors={["#f39005"]}
              titleText="Analysis sales"
              subtitleText="Total sales"
              titleColor="#f39005"
            />
          </div>
        </div>
      )}
    </RegularLayout>
  )
}

export default SellerPage
