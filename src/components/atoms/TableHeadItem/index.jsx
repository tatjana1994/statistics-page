import "./TableHeadItem.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"

import useOnClickOutside from "../../../utils/hooks"
import SvgIcon from "../SvgIcon"

const TableHeadItem = ({ item, highlightedHeadItem, sort }) => {
  const titleClass = classNames("title", {
    large: highlightedHeadItem === item.name,
  })
  const tableHeadClass = classNames("table-head-item-container", { clickable: !!item.field })
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setIsOpen(false))
  const directionFields = [
    { name: "Ascending", direction: "asc" },
    { name: "Descending", direction: "desc" },
    { name: "None", direction: "none" },
  ]
  const sortIcon = () => {
    if (sort.direction === "asc" && sort.field === item.field) {
      return <SvgIcon icon="sort-up" fill="green" width={14} height={14} />
    }
    if (sort.direction === "desc" && sort.field === item.field) {
      return <SvgIcon icon="sort-down" fill="green" width={14} height={14} />
    }
    return <SvgIcon icon="sort" fill="lightgray" width={14} height={14} />
  }
  return (
    <div
      ref={ref}
      className={tableHeadClass}
      role="button"
      onClick={() => {
        if (item.field) {
          setIsOpen(!isOpen)
        }
      }}
    >
      <div className={titleClass}>{item.name}</div>
      {item.field && sortIcon()}
      {isOpen && (
        <div className="popup-container">
          {directionFields.map((directionItem, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  item.onClick(item.field, directionItem.direction)
                }}
                role="button"
                className="direction-item"
              >
                {directionItem.name}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
TableHeadItem.propTypes = {
  sort: PropTypes.string,
  item: PropTypes.instanceOf(Object),
  highlightedHeadItem: PropTypes.string,
}

TableHeadItem.defaultProps = {
  sort: "",
  item: {},
  highlightedHeadItem: "",
}

export default TableHeadItem
