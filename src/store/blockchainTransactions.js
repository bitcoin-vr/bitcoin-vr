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
          console.log("Thunk's newTransaction: ", newTransaction)
          return dispatch(addNewTransaction(newTransaction))
        })

      // let socket = io.connect('http://socket.coincap.io', { jsonp: false })
      // socket.on('trades', (tradeMsg) => {
      //   if (tradeMsg.coin == 'BTC') dispatch(addNewTransaction(tradeMsg.trade.data))
      // })
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
      console.log(newTransaction)

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

      console.log("TransactionSize: ", transactionSize)
      console.log("ExchangeRate: ", newTransaction.exchangeRate)
      console.log("TransactionUSD: ", transactionUSD)

      // Calculate the new position
      let randomX = Math.floor(Math.random() * (200)) + -100;
      // newTransaction.x = Math.random() > 0.5 ? randomX : -randomX
      newTransaction.x = randomX
      let randomZ = Math.floor(Math.random() * (100)) + 40;
      // newTransaction.z = Math.random() > 0.5 ? randomZ : -randomZ
      newTransaction.z = -randomZ

      // Generate random key TODO: replace with more sophisticated hash
      newTransaction.key = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0)) + 0;

      // Scale of the transaction
      switch (true) {
        // Hot Air Balloon
        case (transactionSize < 1):
          newTransaction.scale = 0.4 + (0.6 * transactionSize); // Gives it a minimum value
          newTransaction.color = 'red'
          newTransaction.model = 'balloon'
          break;
        // Zeppelin
        case (1 <= transactionSize < 10):
          newTransaction.scale = 0.6 + (0.4 * transactionSize / 10);
          newTransaction.color = 'orange'
          newTransaction.model = 'zeppelin'
          break;
        case (10 <= transactionSize):
          newTransaction.scale = 2;
          newTransaction.color = 'blue'
          newTransaction.model = 'zeppelin'
          break;
        default:
          newTransaction.scale = 0.2 + (0.8 * transactionSize); // Gives it a minimum value
          newTransaction.color = 'red'
          newTransaction.model = 'balloon'
          break;
      }

      console.log("Test for largest between ", state.largest[0], " and ", transactionSize, " WINNER: ", state.largest[0] < transactionSize ? transactionSize : state.largest[0])
      //Set our counters
      const curLargest = [
        state.largest[0] < transactionSize ? transactionSize : state.largest[0],
        state.largest[1] < transactionUSD ? transactionUSD : state.largest[1]
      ]
      const curTotal = [state.total[0] + transactionSize, state.total[1] + transactionUSD];
      const curLast = [transactionSize, transactionUSD];

      console.log("CurLargest: ", curLargest)
      console.log("CurTotal: ", curTotal)
      console.log("CurLast: ", curLast)

      // 
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
        console.log("Hello!!!")
        console.log("CurLargest: ", curLargest)
        console.log("CurTotal: ", curTotal)
        console.log("CurLast: ", curLast)
        return {
          count: state.count++,
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

