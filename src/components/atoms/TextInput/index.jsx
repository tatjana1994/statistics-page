import "./TextInput.scss"

import PropTypes from "prop-types"
import React from "react"

import SvgIcon from "../SvgIcon"

const TextInput = ({ label, placeholder, inputType, icon }) => {
  return (
    <div className="search-container">
      <div className="label">{label}</div>
      <input placeholder={placeholder} className="input-style" type={inputType} />
      <SvgIcon className="search-icon" icon={icon} width={20} height={20} />
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  icon: PropTypes.string,
}

TextInput.defaultProps = {
  label: "",
  placeholder: "",
  inputType: "text",
  icon: "",
}

export default TextInput
