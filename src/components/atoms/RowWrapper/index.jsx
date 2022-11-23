import "./RowWrapper.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import ImageWrapper from "../ImageWrapper"
import SvgIcon from "../SvgIcon"

const RowWrapper = ({ data, headData, highlightedHeadItem, className, arrowRight }) => {
  const tableClass = classNames("table-container", className)
  return (
    <div className={tableClass}>
      <div className="head-container">
        {headData.map((item, index) => {
          const titleClass = classNames("title", { large: highlightedHeadItem === item })
          return (
            <div key={index} className={titleClass}>
              {item}
            </div>
          )
        })}
      </div>
      {data.map((user, index) => (
        <div key={index} className="row-container">
          <ImageWrapper image={user.image} />
          <div className="name">{user.name}</div>
          <div className="sold">{user.sold}</div>
          <div className="sales">${user.sale}</div>
          {arrowRight && <SvgIcon icon="arrow-right" width={16} height={16} fill="#262427" />}
        </div>
      ))}
    </div>
  )
}

RowWrapper.propTypes = {
  data: PropTypes.instanceOf(Array),
  headData: PropTypes.instanceOf(Array),
  highlightedHeadItem: PropTypes.string,
  className: PropTypes.string,
  arrowRight: PropTypes.bool,
}

RowWrapper.defaultProps = {
  data: [],
  headData: [],
  highlightedHeadItem: "",
  className: "",
  arrowRight: false,
}

export default RowWrapper
