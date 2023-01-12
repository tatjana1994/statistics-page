import "./ProductPage.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { getExtendedProduct, getProduct } from "../../../redux/products/productsActions"
import ImageWrapper from "../../atoms/ImageWrapper"
import Loading from "../../atoms/Loading"
import Specification from "../../atoms/Specification"
import RegularLayout from "../../layouts/RegularLayout"

const SellerPage = () => {
  const [selectedProduct, extendedProduct, loading] = useSelector(({ products }) => [
    products.selectedProduct,
    products.extendedProduct,
    products.loading,
  ])
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProduct(id))
    dispatch(getExtendedProduct(id))
  }, [])

  return (
    <RegularLayout title="Product">
      {loading ? (
        <Loading className="loading" />
      ) : (
        <div className="product-page-container">
          <div className="product-page-wrapper ">
            <div className="product-name">{selectedProduct?.name}</div>
            <div className="image-and-description-wrapper">
              <ImageWrapper
                image={selectedProduct?.image}
                alt="product"
                width={280}
                height={220}
                className="product-image"
              />
              <div className="description">
                <div className="title">Description:</div>
                {extendedProduct?.description}
              </div>

              <div className="price">${selectedProduct?.price}</div>
            </div>
            <div className="title top">Specifications:</div>
            <div className="titles-wrapper">
              <Specification title="Operating system" value={extendedProduct?.operating_system} />
              <Specification title="Processor" value={extendedProduct?.processor} />
              <Specification title="Memory" value={`${extendedProduct?.memory}GB`} />
            </div>
            <div className="titles-wrapper">
              <Specification title="Storage" value={extendedProduct?.storage} />
              <Specification title="Display" value={extendedProduct?.display} />
              <Specification title="Graphics" value={extendedProduct?.graphics} />
            </div>
          </div>
        </div>
      )}
    </RegularLayout>
  )
}

export default SellerPage
