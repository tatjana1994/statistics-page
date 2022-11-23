import "./RegularLayout.scss"

import PropTypes from "prop-types"
import React from "react"

import Header from "../../atoms/Header"
import SideBar from "../../atoms/SideBar"

const RegularLayout = ({ children, title }) => {
  return (
    <div className="regular-layout-constainer">
      <SideBar />
      <div className="header-and-content-wrapper">
        <Header title={title} />
        {children}
      </div>
    </div>
  )
}
RegularLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
}

RegularLayout.defaultProps = {
  title: "",
}

export default RegularLayout
