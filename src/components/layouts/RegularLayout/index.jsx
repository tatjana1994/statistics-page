import "./RegularLayout.scss"

import PropTypes from "prop-types"
import React from "react"
import { useMediaQuery } from "react-responsive"

import Header from "../../atoms/Header"
import SideBar from "../../organisms/SideBar"
import TopBar from "../../organisms/TopBar"

const RegularLayout = ({ children, title }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" })
  return (
    <div className="regular-layout-constainer">
      {!isMobile ? <SideBar /> : <TopBar />}
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
