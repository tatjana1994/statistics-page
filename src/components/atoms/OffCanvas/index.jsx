import "./OffCanvas.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

const OffCanvas = ({ isOpen, setIsOpen, children }) => {
  const containerClass = classNames("off-canvas-container", { isOpen })
  const modalClass = classNames("off-canvas-modal", { isOpen })

  return (
    <div role="button" onClick={() => setIsOpen(false)} className={containerClass}>
      <div role="button" onClick={e => e.stopPropagation()} className={modalClass}>
        {children}
      </div>
    </div>
  )
}

OffCanvas.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
OffCanvas.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
}

export default OffCanvas
