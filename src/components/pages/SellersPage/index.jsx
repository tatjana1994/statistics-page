import "./SellersPage.scss"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { db } from "../../../firebase-config"
import GridRowItem from "../../atoms/GridRowItem"
import ImageWrapper from "../../atoms/ImageWrapper"
import Loading from "../../atoms/Loading"
import RowWrapper from "../../atoms/RowWrapper"
import SvgIcon from "../../atoms/SvgIcon"
import TextInput from "../../atoms/TextInput"
import RegularLayout from "../../layouts/RegularLayout"

const SellersPage = () => {
  const [sort, setSort] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const onSortClick = (field, direction) => {
    if (direction === "none") {
      setSort(undefined)
    } else {
      setSort({ field, direction })
    }
  }
  const sellersHeadData = [
    { name: "All Sellers" },
    { name: "Name", field: "first_name", onClick: onSortClick },
    { name: "Sold", field: "items_sold", onClick: onSortClick },
    { name: "Sale", field: "total_profit", onClick: onSortClick },
  ]

  const parseBodyData = bodyData => {
    return bodyData.map(item => {
      return {
        rowData: item,
        rowItems: [
          <ImageWrapper
            image={item.avatar}
            alt="seller"
            width={46}
            height={46}
            className="seller-image"
            key="grid-row-item-0"
          />,
          <GridRowItem key="grid-row-item-1" value={`${item.first_name} ${item.last_name}`} />,
          <GridRowItem key="grid-row-item-2" value={item.items_sold} />,
          <GridRowItem key="grid-row-item-3" value={`$${item.total_profit}`} color="#6785ff" />,
          <SvgIcon
            key="grid-row-item-4"
            icon="arrow-right"
            width={16}
            height={16}
            fill="#262427"
          />,
        ],
      }
    })
  }
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState([])

  const fetchEmployer = async () => {
    setLoading(true)
    const response = db.collection("/employees")
    const data = await response.get()
    setEmployees(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
    setFilteredEmployees(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
    setLoading(false)
  }
  useEffect(() => {
    fetchEmployer()
  }, [])

  const searchByName = data => {
    setFilteredEmployees(
      data.filter(employee => {
        return (
          employee.first_name.toLowerCase().includes(search.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(search.toLowerCase())
        )
      }),
    )
  }

  useEffect(() => {
    searchByName(sort ? filteredEmployees : employees)
  }, [search])

  const sortData = async sortBy => {
    if (!sortBy) {
      setFilteredEmployees(employees)
    } else {
      const response = db.collection("/employees").orderBy(sortBy.field, sortBy.direction)
      const data = await response.get()
      const parsed = data.docs.map(item => {
        return { ...item.data(), id: item.id }
      })

      if (search) {
        searchByName(parsed)
      } else {
        setFilteredEmployees(parsed)
      }
    }
  }

  useEffect(() => {
    sortData(sort)
  }, [sort])

  return (
    <RegularLayout title="Sellers">
      <div className="sellers-page-container">
        <TextInput
          onChange={e => {
            setSearch(e.target.value)
          }}
          placeholder="Search by name"
          icon="search"
        />
        {loading ? (
          <Loading className="loading" />
        ) : (
          <RowWrapper
            headData={sellersHeadData}
            highlightedHeadItem="All Sellers"
            className="table-page"
            bodyData={parseBodyData(filteredEmployees)}
            sort={sort}
            onRowClick={item => navigate(`/sellers/${item.id}`)}
          />
        )}
      </div>
    </RegularLayout>
  )
}

export default SellersPage
