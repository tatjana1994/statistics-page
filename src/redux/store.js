import { createBrowserHistory } from "history"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { createReduxHistoryContext } from "redux-first-history"
import immutableCheckMiddleWare from "redux-immutable-state-invariant"
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"

import products from "./products/productsReducer"
import sellers from "./sellers/sellersReducer"
import totals from "./totals/totalsReducer"

const { createReduxHistory, routerMiddleware } = createReduxHistoryContext({
  history: createBrowserHistory(),
})
const appReducers = combineReducers({
  products,
  sellers,
  totals,
})

const rootReducer = (state, action) => {
  return appReducers(state, action)
}

const middleware = [thunk, routerMiddleware]

const composeEnhancer =
  (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

if (process.env.NODE_ENV === "development") {
  middleware.push(immutableCheckMiddleWare())
}

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
  duration: true,
})

middleware.push(loggerMiddleware)

export const store = createStore(rootReducer, {}, composeEnhancer(applyMiddleware(...middleware)))
export const history = createReduxHistory(store)
store.subscribe(() => store.getState())
