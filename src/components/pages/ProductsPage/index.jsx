import "./ProductsPage.scss"

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

const ProductsPage = () => {
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
  const productsHeadData = [
    { name: "List of Products" },
    { name: "Name", field: "name", onClick: onSortClick },
    { name: "In Stock", field: "in_stock", onClick: onSortClick },
    { name: "Price", field: "price", onClick: onSortClick },
  ]

  const parseBodyData = bodyData => {
    return bodyData.map(item => {
      return {
        rowData: item,
        rowItems: [
          <ImageWrapper
            image={item.image}
            alt="product"
            width={46}
            height={46}
            className="seller-image"
            key="grid-row-item-0"
          />,
          <GridRowItem key="grid-row-item-1" value={item.name} />,
          <GridRowItem key="grid-row-item-2" value={item.in_stock} color="#20b945" />,
          <GridRowItem key="grid-row-item-3" value={`$${item.price}`} color="#6785ff" />,
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
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const fetchProduct = async () => {
    const response = db.collection("/products")
    const data = await response.get()
    setProducts(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
    setFilteredProducts(
      data.docs.map(item => {
        return { ...item.data(), id: item.id }
      }),
    )
    setLoading(false)
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  const searchByName = data => {
    setFilteredProducts(
      data.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase())
      }),
    )
  }
  useEffect(() => {
    searchByName(sort ? filteredProducts : products)
  }, [search])

  const sortData = async sortBy => {
    if (!sortBy) {
      setFilteredProducts(products)
    } else {
      const response = db.collection("/products").orderBy(sortBy.field, sortBy.direction)
      const data = await response.get()
      const parsed = data.docs.map(item => {
        return { ...item.data(), id: item.id }
      })

      if (search) {
        searchByName(parsed)
      } else {
        setFilteredProducts(parsed)
      }
    }
  }

  useEffect(() => {
    sortData(sort)
  }, [sort])

  return (
    <RegularLayout title="Products">
      <div className="products-page-container">
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
            headData={productsHeadData}
            highlightedHeadItem="List of Products"
            bodyData={parseBodyData(filteredProducts)}
            className="table-page "
            onRowClick={item => navigate(`/products/${item.id}`)}
            sort={sort}
          />
        )}
      </div>
    </RegularLayout>
  )
}

export default ProductsPage
