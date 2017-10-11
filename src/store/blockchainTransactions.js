import axios from 'axios'
import io from 'socket.io-client'

/**
 * ACTION TYPES
 */
const ADD_NEW_TRANSACTION = 'ADD_NEW_TRANSACTION'

/**
 * INITIAL STATE
 */
const initialState = {
  count: 0,
  transactions: []
}


export const addNewTransaction = (newTransaction) => ({
  type: ADD_NEW_TRANSACTION,
  newTransaction
})

/**
 * THUNK CREATORS
 */
export function loadTransactionsIntoState() {
  return function thunk (dispatch) {
    let socket = io.connect('http://socket.coincap.io', {jsonp: false})
    socket.on('trades', (tradeMsg) => {
      // dispatch(addNewTransaction(tradeMsg))
      if (tradeMsg.coin == 'BTC') dispatch(addNewTransaction(tradeMsg))
      // console.log(tradeMsg)
    })
  }
}

 /**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TRANSACTION:
      console.log(action.newTransaction.trade.data.volume)
      
      if (state.count > 100) {
        return {
          count: state.count,
          transactions: [...state.transactions.slice(1), action.newTransaction]
        }
      } else {
        return {
          count: state.count += 1,
          transactions: [...state.transactions, action.newTransaction]
        }
        
      }
    default:
      return state
  }
}