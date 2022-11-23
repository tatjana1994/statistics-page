import PropTypes from "prop-types"
import React from "react"

const SvgIcon = ({ className, style, icon, margin, fill, width, height }) => {
  const url = "/svgstore.sprite.svg"

  return (
    <svg className={className} width={width} height={height} style={{ margin, fill, ...style }}>
      <use xlinkHref={`${url}#${icon}`} />
    </svg>
  )
}

SvgIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  icon: PropTypes.string.isRequired,
  margin: PropTypes.string,
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

SvgIcon.defaultProps = {
  className: "default-icon",
  style: {},
  margin: "0px",
  fill: "#fff",
  width: 24,
  height: 24,
}

export default SvgIcon
