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
  transactions: [],
  largest: [0, 0], // currency, usd
  total: [0, 0], // currency, usd
  last: [0, 0] // currency, usd
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
    let blockchainWS = new WebSocket('wss://ws.blockchain.info/inv')
    blockchainWS.onopen = () => {
      blockchainWS.send(JSON.stringify({ "op": "unconfirmed_sub" }));
    }
    blockchainWS.onmessage = (msg) => {
      // See annotated Blockchain.info Websocket API 
      // I have summarized it at https://gist.github.com/onggunhao/fcce0aac94ba73c44b59b4ff0dd6b638
      let newTransaction = JSON.parse(msg.data).x

      // 1. Gets the current exchange rate as the transactions Websocket does not include it
      // As Blockchain.info's UTX websocket does not have the exchange price, we approximate using the last exchange rate
      // See https://blockchain.info/api/exchange_rates_api
      // 2. Uses Fetch TODO: refactor with cross-fetch
      // See https://github.com/reactjs/redux/blob/master/docs/advanced/AsyncActions.md
      return fetch('https://blockchain.info/ticker')
        .then((resp) => resp.json())
        .then((msg) => {
          newTransaction.exchangeRate = msg.USD.last
          return dispatch(addNewTransaction(newTransaction))
        })
    }
  }
}

/**
* REDUCER
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TRANSACTION: {

      let newTransaction = action.newTransaction
      newTransaction.display = {} // Holds display properties of the transaction

      // Gets transaction size from the Blockchain.info UTX websocket
      // Note that it is necessary to sum over all 'out' transactions to get the full sum
      // Also note that the volume is in satoshis
      // More info: https://bitcointalk.org/index.php?topic=718791.0
      let amount = 0;
      for (var i = 0; i < newTransaction.out.length; i++) {
        amount += newTransaction.out[i].value;
      }
      transactionSize = amount / 100000000
      transactionUSD = +(newTransaction.exchangeRate * transactionSize).toFixed(2);

      // Calculate the new position
      let randomX = Math.floor(Math.random() * (200)) + -100;
      newTransaction.display.x = Math.random() > 0.5 ? randomX : -randomX
      let randomZ = Math.floor(Math.random() * (100)) + 40;
      newTransaction.display.z = Math.random() > 0.5 ? randomZ : -randomZ

      // Generate random key TODO: replace with more sophisticated hash
      newTransaction.key = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0)) + 0;

      // Scale of the transaction
      switch (true) {
        // Hot Air Balloon
        case (transactionSize < 10):
          newTransaction.display.scale = 0.4 + (0.6 * transactionSize); // Gives it a minimum value
          newTransaction.display.color = 'red'
          newTransaction.display.model = 'balloon'
          break;
        // Zeppelin
        case (10 <= transactionSize < 50):
          newTransaction.scale = 0.6 + (0.4 * transactionSize / 10);
          newTransaction.display.color = 'orange'
          newTransaction.display.model = 'zeppelin'
          break;
        case (50 <= transactionSize):
          newTransaction.scale = 2;
          newTransaction.display.color = 'blue'
          newTransaction.display.model = 'zeppelin'
          break;
        default:
          newTransaction.scale = 0.2 + (0.8 * transactionSize); // Gives it a minimum value
          newTransaction.display.color = 'red'
          newTransaction.display.model = 'balloon'
          break;
      }

      //Set our counters
      const curLargest = [
        state.largest[0] < transactionSize ? transactionSize : state.largest[0],
        state.largest[1] < transactionUSD ? transactionUSD : state.largest[1]
      ]
      const curTotal = [state.total[0] + transactionSize, state.total[1] + transactionUSD];
      const curLast = [transactionSize, transactionUSD];

      newTransaction.transactionSize = transactionSize;
      newTransaction.transactionUSD = transactionUSD;

      // Keeps the maximum number of transactions at 200 for performance
      if (state.count > 200) {
        return {
          count: state.count,
          transactions: [...state.transactions.slice(1), newTransaction],
          largest: curLargest,
          total: curTotal,
          last: curLast
        }
      } else {
        return {
          count: state.count + 1,
          transactions: [...state.transactions, newTransaction],
          largest: curLargest,
          total: curTotal,
          last: curLast
        }
      }
    }
    default:
      return state
  }
}

