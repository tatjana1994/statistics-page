import "./SellerPage.scss"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

import { db } from "../../../firebase-config"
import ImageWrapper from "../../atoms/ImageWrapper"
import PeriodTotalCard from "../../atoms/PeriodTotalCard"
import RegularLayout from "../../layouts/RegularLayout"

const SellerPage = () => {
  const [employees, setEmployees] = useState("")
  const { id } = useParams()

  const fetchEmployer = async () => {
    db.collection("/employees")
      .doc(id)
      .get()
      .then(snapshot => setEmployees(snapshot.data()))
  }
  useEffect(() => {
    fetchEmployer()
  }, [])

  return (
    <RegularLayout title="Seller">
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
        <div className="period-card">
          <PeriodTotalCard title="Total Earned" />
          <PeriodTotalCard />
        </div>
      </div>
    </RegularLayout>
  )
}

export default SellerPage
