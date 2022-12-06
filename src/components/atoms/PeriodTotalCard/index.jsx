import "./PeriodTotalCard.scss"

import PropTypes from "prop-types"
import React from "react"

import SvgIcon from "../SvgIcon"

const PeriodTotalCard = ({ title, date, value, percentage }) => {
  return (
    <div className="total-card-container">
      <div className="info-box-wrapper">
        <div>
          <div className="total-card-title">{title}</div>
          <div className="total-card-from">From {date}</div>
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
        <div className="value">{value}</div>
        <div className="value-percentage-wrapper">
          <SvgIcon icon="arrow-trend-up" fill="#20b945" />
          <div className="value-percentage">{percentage}%</div>
        </div>
      </div>
    </div>
  )
}

PeriodTotalCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  value: PropTypes.number,
  percentage: PropTypes.number,
}

PeriodTotalCard.defaultProps = {
  title: "",
  date: "",
  value: 0,
  percentage: 0,
}

export default PeriodTotalCard
