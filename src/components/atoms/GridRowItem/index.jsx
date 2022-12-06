import "./GridRowItem.scss"

import PropTypes from "prop-types"
import React from "react"

const GridRowItem = ({ value, color }) => {
  return (
    <div className="grid-row-item-container" style={{ color }}>
      {value}
    </div>
  )
}

GridRowItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
}

GridRowItem.defaultProps = {
  value: "",
  color: "",
}

export default GridRowItem
