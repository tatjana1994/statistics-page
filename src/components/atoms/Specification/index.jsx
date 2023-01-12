import PropTypes from "prop-types"
import React from "react"

const Specification = ({ value, title }) => {
  return (
    <div className="info-wrapper">
      {title}:<div className="info">{value}</div>
    </div>
  )
}

Specification.propTypes = {
  value: PropTypes.instanceOf(Array),
  title: PropTypes.string,
}

Specification.defaultProps = {
  title: "",
  value: [],
}

export default Specification
