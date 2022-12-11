import "./SellerPage.scss"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

import { db } from "../../../firebase-config"
import BarChart from "../../atoms/BarChart"
import ImageWrapper from "../../atoms/ImageWrapper"
import LineChart from "../../atoms/LineChart"
import Loading from "../../atoms/Loading"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import RegularLayout from "../../layouts/RegularLayout"

const SellerPage = () => {
  const [employees, setEmployees] = useState("")
  const [extendedEmployees, setExtendedEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  const fetchEmployer = async () => {
    await db
      .collection("/employees")
      .doc(id)
      .get()
      .then(snapshot => setEmployees(snapshot.data()))
    await db
      .collection("/extended_employees")
      .doc(id)
      .get()
      .then(snapshot => setExtendedEmployees(snapshot.data()))
    setLoading(false)
  }
  useEffect(() => {
    fetchEmployer()
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
              image={employees.avatar}
              alt="seller"
              width={120}
              height={120}
              className="seller-image"
            />
            <div className="seller-info-wrapper">
              <div className="info">
                <div className="title">Name: </div>
                {employees.first_name} {employees.last_name}
              </div>
              <div className="info">
                <div className="title">Phone number:</div> {employees.phone_number}
              </div>

              <div className="info">
                <div className="title">Email:</div> {employees.email_address}
              </div>
            </div>
          </div>

          <div className="seller-period-card">
            <PeriodTotalCard
              date={extendedEmployees.date}
              percentage={extendedEmployees.percentageOfTotalEarned}
              title="Total Earned"
              value={`$${totalEarned(extendedEmployees.earningsPerMonth)}`}
              valueColor="#ec68a7"
            />
            <LineChart
              seriesData={[{ name: "Earned per month", data: extendedEmployees.earningsPerMonth }]}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              titleText="Analysis earnings"
              subtitle="Total earnings"
              colors={["#ec68a7"]}
              titleColor="#ec68a7"
            />
          </div>

          <div className="seller-period-card">
            <PeriodTotalCard
              date={extendedEmployees.date}
              title="Total Sold"
              value={totalEarned(extendedEmployees.soldPerMonth)}
              valueColor="#f39005"
              percentage={extendedEmployees.percentageOfTotalSold}
            />
            <BarChart
              seriesData={[{ name: "Sold per month", data: extendedEmployees.soldPerMonth }]}
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
