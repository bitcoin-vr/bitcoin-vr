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
  return function thunk(dispatch) {
    let socket = io.connect('https://socket.coincap.io', { jsonp: false })
    socket.on('trades', (tradeMsg) => {
      if (tradeMsg.coin == 'BTC') dispatch(addNewTransaction(tradeMsg.trade.data))
      // dispatch(addNewTransaction(tradeMsg.trade.data))
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
      let randomX = Math.floor(Math.random() * (200)) + -100;
      // action.newTransaction.x = Math.random() > 0.5 ? randomX : -randomX
      action.newTransaction.x = randomX
      let randomZ = Math.floor(Math.random() * (100)) + 40;
      // action.newTransaction.z = Math.random() > 0.5 ? randomZ : -randomZ
      action.newTransaction.z = -randomZ

      // Generate key
      action.newTransaction.key = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0)) + 0;

      // Scale of the transaction
      switch (true) {
        // Hot Air Balloon
        case (transactionSize < 1):
          action.newTransaction.scale = 0.4 + (0.6 * transactionSize); // Gives it a minimum value
          action.newTransaction.color = 'red'
          action.newTransaction.model = 'balloon'
          break;
        // Zeppelin
        case (1 <= transactionSize < 10):
          action.newTransaction.scale = 0.6 + (0.4 * transactionSize / 10);
          action.newTransaction.color = 'orange'
          action.newTransaction.model = 'zeppelin'
          break;
        case (10 <= transactionSize):
          action.newTransaction.scale = 2;
          action.newTransaction.color = 'blue'
          action.newTransaction.model = 'zeppelin'
          break;
        default:
          action.newTransaction.scale = 0.2 + (0.8 * transactionSize); // Gives it a minimum value
          action.newTransaction.color = 'red'
          action.newTransaction.model = 'balloon'
          break;
      }

      // Keeps the maximum number of transactions at 100 for performance
      if (state.count > 200) {
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