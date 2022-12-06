import "./TextInput.scss"

import PropTypes from "prop-types"
import React from "react"

import SvgIcon from "../SvgIcon"

const TextInput = ({ label, placeholder, inputType, icon, autoComplete, onChange }) => {
  return (
    <div className="search-container">
      <div className="label">{label}</div>
      <input
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="input-style"
        type={inputType}
      />
      <SvgIcon className="search-icon" icon={icon} width={20} height={20} />
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  icon: PropTypes.string,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  label: "",
  placeholder: "",
  inputType: "text",
  icon: "",
  autoComplete: "",
  onChange: () => {},
}

export default TextInput
