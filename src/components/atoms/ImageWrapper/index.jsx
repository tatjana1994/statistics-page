import PropTypes from "prop-types"
import React from "react"

const ImageWrapper = ({ image, alt, width, height, className }) => {
  return (
    <div className={className}>
      <img src={image} width={width} height={height} alt={alt} />
    </div>
  )
}

ImageWrapper.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
}

ImageWrapper.defaultProps = {
  image: "",
  alt: "",
  width: 0,
  height: 0,
  className: "",
}

export default ImageWrapper
