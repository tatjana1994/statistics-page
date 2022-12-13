import ACTIONS from "../../constants/ACTIONS"
import { db } from "../../firebase-config"

const getProducts = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_PRODUCTS })
      const response = db.collection("/products")
      const data = await response.get()

      dispatch({
        type: ACTIONS.GET_PRODUCTS_SUCCESS,
        payload: data.docs.map(item => {
          return { ...item.data(), id: item.id }
        }),
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_PRODUCTS_FAIL })
    }
  }
}

const filterProducts = (sort, search) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.FILTER_PRODUCTS })

      dispatch({
        type: ACTIONS.FILTER_PRODUCTS_SUCCESS,
        field: sort ? "filteredProducts" : "allProducts",
        search,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.FILTER_PRODUCTS_FAIL })
    }
  }
}

const sortProducts = (sort, search) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SORT_PRODUCTS })

      if (!sort) {
        dispatch({ type: ACTIONS.RESET_FILTERED_PRODUCTS, search })
      }

      const response = db.collection("/products").orderBy(sort.field, sort.direction)
      const data = await response.get()

      const parsed = data.docs.map(item => {
        return { ...item.data(), id: item.id }
      })

      dispatch({
        type: ACTIONS.SORT_PRODUCTS_SUCCESS,
        payload: search
          ? parsed.filter(product => {
              return product.name.toLowerCase().includes(search.toLowerCase())
            })
          : parsed,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.SORT_PRODUCTS_FAIL })
    }
  }
}

const getProduct = id => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_PRODUCT })
      const response = await db
        .collection("/products")
        .doc(id)
        .get()
        .then(snapshot => snapshot.data())
      dispatch({
        type: ACTIONS.GET_PRODUCT_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_PRODUCT_FAIL })
    }
  }
}
const getExtendedProduct = id => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_EXTENDED_PRODUCT })
      const response = await db
        .collection("/extended_product")
        .doc(id)
        .get()
        .then(snapshot => snapshot.data())
      dispatch({
        type: ACTIONS.GET_EXTENDED_PRODUCT_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_EXTENDED_PRODUCT_FAIL })
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { filterProducts, getExtendedProduct, getProduct, getProducts, sortProducts }
