import "./ImageWrapper.scss"

import PropTypes from "prop-types"
import React from "react"

const ImageWrapper = ({ image }) => {
  return <img src={image} width={46} height={46} alt="user" />
}

ImageWrapper.propTypes = {
  image: PropTypes.string,
}

ImageWrapper.defaultProps = {
  image: "",
}

export default ImageWrapper
