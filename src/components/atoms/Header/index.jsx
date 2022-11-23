import "./Header.scss"

import moment from "moment"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ title }) => {
  return (
    <div className="header-container">
      <div className="header-title">{title}</div>
      <div className="current-time">{moment().format("dddd, MMMM DD, YYYY")}</div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: "",
}

export default Header
