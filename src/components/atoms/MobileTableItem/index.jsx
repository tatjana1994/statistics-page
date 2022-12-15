import "./MobileTableItem.scss"

import PropTypes from "prop-types"
import React from "react"

const MobileTableItem = ({ data, onTableClick }) => {
  return (
    <div className="mobile-table-item-container">
      <div role="button" onClick={onTableClick} className="table-wrapper">
        {data.rows.map(item => {
          return (
            <div className="row-item-wrapper">
              <div className="row-item-left">{item.name}</div>
              <div className="row-item-right">{item.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

MobileTableItem.propTypes = {
  data: PropTypes.instanceOf(Array),
  onTableClick: PropTypes.func,
}
MobileTableItem.defaultProps = {
  data: [],
  onTableClick: () => {},
}

export default MobileTableItem
