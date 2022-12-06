import "./Loading.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

const Loading = ({ className, buttonLoading }) => {
  const loadingClass = classNames(`loading-container ${className}`, { buttonLoading })
  return (
    <div className={loadingClass}>
      <img
        className="loading-image"
        width="22"
        height="22"
        src="/media/loading.gif"
        alt="Loading animation"
      />
      {!buttonLoading && <span className="loading-label">Loading</span>}
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  buttonLoading: PropTypes.bool,
}

Loading.defaultProps = {
  className: "",
  buttonLoading: false,
}

export default Loading
