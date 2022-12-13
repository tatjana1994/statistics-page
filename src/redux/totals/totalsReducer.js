import ACTIONS from "../../constants/ACTIONS"

const initalState = { allTotals: [], loading: false }

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case ACTIONS.GET_TOTALS:
      return { ...state, loading: true }

    case ACTIONS.GET_TOTALS_SUCCESS:
      return {
        ...state,
        allTotals: action.payload,
        loading: false,
      }

    case ACTIONS.GET_TOTALS_FAIL: {
      return { ...state, loading: false }
    }

    default:
      return state
  }
}
