import ACTIONS from "../../constants/ACTIONS"

const initalState = {
  allSellers: [],
  filteredSellers: [],
  loading: false,
  selectedSeller: [],
  extendedSeller: [],
}

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case ACTIONS.GET_SELLERS:
      return { ...state, loading: true }

    case ACTIONS.GET_SELLERS_SUCCESS:
      return {
        ...state,
        allSellers: action.payload,
        filteredSellers: action.payload,
        loading: false,
      }

    case ACTIONS.GET_SELLERS_FAIL: {
      return { ...state, loading: false }
    }

    case ACTIONS.GET_SELLER:
      return { ...state, loading: true }

    case ACTIONS.GET_SELLER_SUCCESS:
      return {
        ...state,
        selectedSeller: action.payload,
        loading: false,
      }

    case ACTIONS.GET_SELLER_FAIL: {
      return { ...state, loading: false }
    }

    case ACTIONS.GET_EXTENDED_SELLER:
      return { ...state, loading: true }

    case ACTIONS.GET_EXTENDED_SELLER_SUCCESS:
      return {
        ...state,
        extendedSeller: action.payload,
        loading: false,
      }

    case ACTIONS.GET_EXTENDED_SELLER_FAIL: {
      return { ...state, loading: false }
    }

    case ACTIONS.FILTER_SELLERS_SUCCESS:
      return {
        ...state,
        filteredSellers: state[action.field].filter(seller => {
          return (
            seller.first_name.toLowerCase().includes(action.search.toLowerCase()) ||
            seller.last_name.toLowerCase().includes(action.search.toLowerCase())
          )
        }),
      }

    case ACTIONS.RESET_FILTERED_SELLERS:
      return {
        ...state,
        filteredSellers: action.search
          ? state.allSellers.filter(seller => {
              return (
                seller.first_name.toLowerCase().includes(action.search.toLowerCase()) ||
                seller.last_name.toLowerCase().includes(action.search.toLowerCase())
              )
            })
          : state.allSellers,
      }

    case ACTIONS.SORT_SELLERS_SUCCESS:
      return { ...state, filteredSellers: action.payload }

    default:
      return state
  }
}
