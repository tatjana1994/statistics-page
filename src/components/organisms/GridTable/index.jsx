import "./GridTable.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import TableHeadItem from "../../atoms/TableHeadItem"

const GridTable = ({ headData, highlightedHeadItem, className, sort, bodyData, onRowClick }) => {
  const tableClass = classNames("table-container", className)
  return (
    <div className={tableClass}>
      <div className="head-container">
        {headData.map((item, index) => {
          return (
            <TableHeadItem
              sort={sort}
              key={index}
              item={item}
              highlightedHeadItem={highlightedHeadItem}
            />
          )
        })}
      </div>

      {bodyData &&
        bodyData.map((row, index) => {
          const rowContainerClass = classNames("row-container", { isFirst: index === 0 })
          return (
            <div
              role="button"
              onClick={() => onRowClick(row.rowData)}
              key={index}
              className={rowContainerClass}
            >
              {row.rowItems.map(item => {
                return item
              })}
            </div>
          )
        })}
    </div>
  )
}

GridTable.propTypes = {
  bodyData: PropTypes.instanceOf(Array),
  headData: PropTypes.instanceOf(Array),
  highlightedHeadItem: PropTypes.string,
  className: PropTypes.string,
  sort: PropTypes.string,
  onRowClick: PropTypes.func,
}

GridTable.defaultProps = {
  bodyData: [],
  headData: [],
  highlightedHeadItem: "",
  className: "",
  sort: "",
  onRowClick: () => {},
}

export default GridTable
