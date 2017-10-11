import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import model from './model'
import blockchainTransactions from './blockchainTransactions'

const reducer = combineReducers({
  blockchainTransactions,
  model

})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store

export * from './model'
export * from './blockchainTransactions'