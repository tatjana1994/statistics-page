import "./ProductPage.scss"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

import { db } from "../../../firebase-config"
import ImageWrapper from "../../atoms/ImageWrapper"
import RegularLayout from "../../layouts/RegularLayout"

const SellerPage = () => {
  const [products, setProducts] = useState("")
  const [extendedProducts, setExtendedProducts] = useState("")
  const { id } = useParams()

  const fetchProduct = async () => {
    db.collection("/products")
      .doc(id)
      .get()
      .then(snapshot => setProducts(snapshot.data()))
  }
  const fetchExtendedProduct = async () => {
    db.collection("/extended_product")
      .doc(id)
      .get()
      .then(snapshot => setExtendedProducts(snapshot.data()))
  }
  useEffect(() => {
    fetchProduct()
    fetchExtendedProduct()
  }, [])

  return (
    <RegularLayout title="Product">
      <div className="product-page-container">
        <div className="product-page-wrapper ">
          <div className="product-name">{products.name}</div>
          <div className="image-and-description-wrapper">
            <ImageWrapper
              image={products.image}
              alt="product"
              width={280}
              height={220}
              className="product-image"
            />
            <div className="description">
              <div className="title">Description:</div>
              {extendedProducts.description}
            </div>

            <div className="price">${products.price}</div>
          </div>
          <div className="title top">Specifications:</div>
          <div className="titles-wrapper">
            <div className="info-wrapper">
              Operating system:<div className="info">{extendedProducts.operating_system}</div>
            </div>
            <div className="info-wrapper">
              Processor:<div className="info">{extendedProducts.processor}</div>
            </div>
            <div className="info-wrapper">
              Memory:<div className="info">{extendedProducts.memory}GB</div>
            </div>
          </div>
          <div className="titles-wrapper">
            <div className="info-wrapper">
              Storage:<div className="info">{extendedProducts.storage}</div>
            </div>
            <div className="info-wrapper">
              Display:<div className="info">{extendedProducts?.display}</div>
            </div>
            <div className="info-wrapper">
              Graphics:<div className="info">{extendedProducts.graphics}</div>
            </div>
          </div>
        </div>
      </div>
    </RegularLayout>
  )
}

export default SellerPage
