import axios from 'axios'
import io from 'socket.io-client'

/**
 * CONSTANTS
 */
const FIRST_RADIAL = 100
const SECOND_RADIAL = 150
const THIRD_RADIAL = 200
const FOURTH_RADIAL = 300
const FIFTH_RADIAL = 400
const SIXTH_RADIAL = 500


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
      // 2. Uses Fetch TODO: refactor with cross-fetch to maintain browser compatibility
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

function generateCoordinates(radius) {
  let randomAngle = Math.random()*Math.PI*2
  return {
    x: radius * Math.sin(randomAngle), 
    z: radius * Math.cos(randomAngle)
  }
}

/**
* REDUCER
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TRANSACTION: {
      let newTransaction = action.newTransaction
      newTransaction.display = {} // Initialize dict to hold display properties

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

      // Generate random key TODO: replace with more sophisticated hash
      newTransaction.key = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0)) + 0;

      // Scale of the transaction
      switch (true) {
        // Hot Air Balloon
        case (transactionSize < 1):
          newTransaction.display.scale = 0.3; // Gives it a minimum value
          newTransaction.display.color = 'red'
          newTransaction.display.model = 'balloon'
          newTransaction.display.radial = FIRST_RADIAL
          break;
        case (transactionSize < 10):
          newTransaction.display.scale = 0.6; // Gives it a minimum value
          newTransaction.display.color = 'green'
          newTransaction.display.model = 'balloon'
          newTransaction.display.radial = SECOND_RADIAL
          break;
        // Zeppelin
        case (transactionSize < 50):
          newTransaction.display.scale = 1.2
          newTransaction.display.color = 'orange'
          newTransaction.display.model = 'balloon'
          newTransaction.display.radial = THIRD_RADIAL
          break;
        case (transactionSize < 100):
          newTransaction.display.scale = 1;
          newTransaction.display.color = 'yellow'
          newTransaction.display.model = 'zeppelin'
          newTransaction.display.radial = FOURTH_RADIAL
          break;
        case (transactionSize < 1000):
          newTransaction.display.scale = 2;
          newTransaction.display.color = 'blue'
          newTransaction.display.model = 'zeppelin'
          newTransaction.display.radial = FIFTH_RADIAL
          break;
        case (1000 < transactionSize):
          newTransaction.display.scale = 3;
          newTransaction.display.color = 'purple'
          newTransaction.display.model = 'zeppelin'
          newTransaction.display.radial = SIXTH_RADIAL
          break;
        default:
          newTransaction.display.scale = 0.2 + (0.8 * transactionSize); // Gives it a minimum value
          newTransaction.display.color = 'red'
          newTransaction.display.model = 'balloon'
          newTransaction.display.radial = FIRST_RADIAL
          break;
      }

      //  Calculate the new position
      let randomCoordinates = generateCoordinates(newTransaction.display.radial)
      newTransaction.display.x = randomCoordinates.x
      newTransaction.display.z = randomCoordinates.z
      let distance = Math.sqrt(Math.pow(newTransaction.display.x, 2) + Math.pow(newTransaction.display.z, 2))
      // let randomX =  FIFTH_RADIAL * Math.sin(Math.floor(Math.random() * (360)));
      // newTransaction.display.x = randomX
      // let randomZ = FIFTH_RADIAL * Math.cos(Math.floor(Math.random() * (360)));
      // newTransaction.display.z = randomZ
      // console.log("Radial: ", newTransaction.display.radial)
      // console.log("Coordinates: ", newTransaction.display.x, ", ", newTransaction.display.z)
      // console.log("Distance: ", distance)
      // console.log("Difference: ", newTransaction.display.radial - distance)

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
      if (state.count > 50) {
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

