import ACTIONS from "../../constants/ACTIONS"

const initalState = {
  allProducts: [],
  filteredProducts: [],
  loading: false,
  selectedProduct: [],
  extendedProduct: [],
}

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, loading: true }

    case ACTIONS.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
        filteredProducts: action.payload,
        loading: false,
      }

    case ACTIONS.GET_PRODUCTS_FAIL: {
      return { ...state, loading: false }
    }

    case ACTIONS.GET_PRODUCT:
      return { ...state, loading: true }

    case ACTIONS.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        selectedProduct: action.payload,
        loading: false,
      }

    case ACTIONS.GET_PRODUCT_FAIL: {
      return { ...state, loading: false }
    }

    case ACTIONS.GET_EXTENDED_PRODUCT:
      return { ...state, loading: true }

    case ACTIONS.GET_EXTENDED_PRODUCT_SUCCESS:
      return {
        ...state,
        extendedProduct: action.payload,
        loading: false,
      }

    case ACTIONS.GET_EXTENDED_PRODUCT_FAIL: {
      return { ...state, loading: false }
    }

    case ACTIONS.FILTER_PRODUCTS_SUCCESS:
      return {
        ...state,
        filteredProducts: state[action.field].filter(product => {
          return product.name.toLowerCase().includes(action.search.toLowerCase())
        }),
      }

    case ACTIONS.RESET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.search
          ? state.allProducts.filter(product => {
              return product.name.toLowerCase().includes(action.search.toLowerCase())
            })
          : state.allProducts,
      }

    case ACTIONS.SORT_PRODUCTS_SUCCESS:
      return { ...state, filteredProducts: action.payload }

    default:
      return state
  }
}
