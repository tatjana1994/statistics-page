/* eslint-disable react/button-has-type */
import "./Button.scss"

import PropTypes from "prop-types"
import React from "react"

const Button = ({ onClick, children, disabled, type }) => {
  return (
    <div className="button-container" onClick={onClick} role="button">
      <button className="button" disabled={disabled} type={type}>
        {children}
      </button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  children: "",
  type: "button",
}

export default Button
