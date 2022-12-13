import ACTIONS from "../../constants/ACTIONS"
import { db } from "../../firebase-config"

const getSellers = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_SELLERS })
      const response = db.collection("/employees")
      const data = await response.get()

      dispatch({
        type: ACTIONS.GET_SELLERS_SUCCESS,
        payload: data.docs.map(item => {
          return { ...item.data(), id: item.id }
        }),
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_SELLERS_FAIL })
    }
  }
}

const filterSellers = (sort, search) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.FILTER_SELLERS })

      dispatch({
        type: ACTIONS.FILTER_SELLERS_SUCCESS,
        field: sort ? "filteredSellers" : "allSellers",
        search,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.FILTER_SELLERS_FAIL })
    }
  }
}

const sortSellers = (sort, search) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SORT_SELLERS })

      if (!sort) {
        dispatch({ type: ACTIONS.RESET_FILTERED_SELLERS, search })
      }

      const response = db.collection("/employees").orderBy(sort.field, sort.direction)
      const data = await response.get()

      const parsed = data.docs.map(item => {
        return { ...item.data(), id: item.id }
      })

      dispatch({
        type: ACTIONS.SORT_SELLERS_SUCCESS,
        payload: search
          ? parsed.filter(seller => {
              return (
                seller.first_name.toLowerCase().includes(search.toLowerCase()) ||
                seller.last_name.toLowerCase().includes(search.toLowerCase())
              )
            })
          : parsed,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.SORT_SELLERS_FAIL })
    }
  }
}

const getSeller = id => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_SELLER })
      const response = await db
        .collection("/employees")
        .doc(id)
        .get()
        .then(snapshot => snapshot.data())
      dispatch({
        type: ACTIONS.GET_SELLER_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_SELLER_FAIL })
    }
  }
}
const getExtendedSeller = id => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.GET_EXTENDED_SELLER })
      const response = await db
        .collection("/extended_employees")
        .doc(id)
        .get()
        .then(snapshot => snapshot.data())
      dispatch({
        type: ACTIONS.GET_EXTENDED_SELLER_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_EXTENDED_SELLER_FAIL })
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { filterSellers, getExtendedSeller, getSeller, getSellers, sortSellers }
