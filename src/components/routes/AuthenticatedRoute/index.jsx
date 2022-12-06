import PropTypes from "prop-types"
import React from "react"
import { Navigate } from "react-router"

const AuthenticatedRoute = ({ children }) => {
  const token = window.localStorage.getItem("accessToken")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AuthenticatedRoute
