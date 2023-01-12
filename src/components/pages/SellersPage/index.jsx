import "./SellersPage.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router"

import { filterSellers, getSellers, sortSellers } from "../../../redux/sellers/sellersActions"
import GridRowItem from "../../atoms/GridRowItem"
import ImageWrapper from "../../atoms/ImageWrapper"
import Loading from "../../atoms/Loading"
import MobileTableItem from "../../atoms/MobileTableItem"
import SvgIcon from "../../atoms/SvgIcon"
import TextInput from "../../atoms/TextInput"
import RegularLayout from "../../layouts/RegularLayout"
import GridTable from "../../organisms/GridTable"

const SellersPage = () => {
  const [filteredSellers, loading] = useSelector(({ sellers }) => [
    sellers.filteredSellers,
    sellers.loading,
  ])
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" })

  const dispatch = useDispatch()
  const [sort, setSort] = useState(undefined)

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
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getSellers())
  }, [])

  useEffect(() => {
    dispatch(filterSellers(sort, search))
  }, [search])

  useEffect(() => {
    dispatch(sortSellers(sort, search))
  }, [sort])

  const parseMobileData = () => {
    return filteredSellers.map(item => {
      return {
        id: item.id,
        rows: [
          { name: "Name:", value: `${item.first_name} ${item.last_name}` },
          { name: "In Stock:", value: item.items_sold },
          { name: "Price:", value: `$${item.total_profit}` },
        ],
      }
    })
  }

  const getBody = () => {
    if (loading) {
      return <Loading className="loading" />
    }
    if (isMobile) {
      return parseMobileData().map((item, index) => {
        return (
          <MobileTableItem
            key={index}
            data={item}
            onTableClick={() => navigate(`/sellers/${item.id}`)}
          />
        )
      })
    }
    return (
      <GridTable
        headData={sellersHeadData}
        highlightedHeadItem="All Sellers"
        className="table-page"
        bodyData={parseBodyData(filteredSellers)}
        sort={sort}
        onRowClick={item => navigate(`/sellers/${item.id}`)}
      />
    )
  }
  return (
    <RegularLayout title="Sellers">
      <div className="sellers-page-container">
        <TextInput
          onChange={e => {
            setSearch(e.target.value)
          }}
          placeholder="Search by name"
          icon="search"
          withIcon
        />
        {isMobile && <div className="title-wrapper">ALL SELLERS</div>}
        {getBody()}
      </div>
    </RegularLayout>
  )
}

export default SellersPage
