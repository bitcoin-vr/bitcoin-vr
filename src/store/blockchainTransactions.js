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
      if (tradeMsg.coin == 'BTC') dispatch(addNewTransaction(tradeMsg.trade.data))
    })
  }
}

 /**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TRANSACTION:
      console.log(action.newTransaction)
      const transactionSize = action.newTransaction.volume

      // Positioning of new transaction
      // TODO: Refactor into ring?
      action.newTransaction.x = Math.floor(Math.random() * (200 - -200 + 1)) + -200;
      action.newTransaction.z = Math.floor(Math.random() * (200 - -200 + 1)) + -200;
      
      // Generate key
      action.newTransaction.key = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0)) + 0;

      // Scale of the transaction
      switch (true) {
        case (transactionSize < 1):
          action.newTransaction.scale = 1;
          action.newTransaction.color = 'red'
          break;
        case (1 <= transactionSize < 10):
         action.newTransaction.scale = 5;
          action.newTransaction.color = 'orange'
          break;
        case (10 <= transactionSize < 100):
        action.newTransaction.scale = 20;
        action.newTransaction.color = 'blue'
          break;
        default:
          width = depth = height = 0.5;
          break;
      }

      // Keeps the maximum number of transactions at 100 for performance
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