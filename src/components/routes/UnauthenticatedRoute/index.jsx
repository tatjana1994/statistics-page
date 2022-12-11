import "react-toastify/dist/ReactToastify.css"

import PropTypes from "prop-types"
import React from "react"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

const UnauthenticatedRoute = ({ children }) => {
  const token = window.localStorage.getItem("accessToken")

  if (token) {
    toast.warn("You have to log out first.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    })
    return <Navigate to="/" replace />
  }
  return children
}

UnauthenticatedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default UnauthenticatedRoute
