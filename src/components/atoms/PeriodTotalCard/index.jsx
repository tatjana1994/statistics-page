import "./PeriodTotalCard.scss"

import React from "react"

import SvgIcon from "../SvgIcon"

const PeriodTotalCard = () => {
  return (
    <div className="total-card-container">
      <div className="info-box-wrapper">
        <div>
          <div className="total-card-title">Order Received</div>
          <div className="total-card-from">From July 2020</div>
        </div>
        <SvgIcon
          className="icon-style"
          icon="order-received"
          width={32}
          height={32}
          fill="#6785ff"
        />
      </div>
      <div className="value-box-wrapper">
        <div className="value">2051</div>
        <div className="value-percentage-wrapper">
          <SvgIcon icon="arrow-trend-up" fill="#20b945" />
          <div className="value-percentage">10%</div>
        </div>
      </div>
    </div>
  )
}

export default PeriodTotalCard
