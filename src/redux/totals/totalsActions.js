import ACTIONS from "../../constants/ACTIONS"
import { db } from "../../firebase-config"

const getTotals = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_TOTALS })
      const response = db.collection("/totals")
      const data = await response.get()

      dispatch({
        type: ACTIONS.GET_TOTALS_SUCCESS,
        payload: data.docs.map(item => {
          return item.data()
        }),
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_TOTALS_FAIL })
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { getTotals }
