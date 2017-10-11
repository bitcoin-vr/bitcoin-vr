import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_DATAPOINTS_INTO_STATE = 'LOAD_DATAPOINTS_INTO_STATE';
const LOAD_AXIS_INTO_STATE = 'LOAD_AXIS_INTO_STATE';

/**
 * INITIAL STATE
 */
const initialState = {
  datapoints: [],
  axis: []
}

/**
 * ACTION CREATORS
 */
export const loadDatapointsIntoState = (datapoints) => ({
  type: LOAD_DATAPOINTS_INTO_STATE,
  datapoints
})

export const loadAxisIntoState = (axis) => ({
  type: LOAD_AXIS_INTO_STATE,
  axis
})

/**
 * THUNK CREATORS
 */
// export const me = () =>
// dispatch =>
//   axios.get('/auth/me')
//     .then(res =>
//       dispatch(getUser(res.data || defaultUser)))
//     .catch(err => console.log(err))

 /**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_DATAPOINTS_INTO_STATE:
      return Object.assign({}, ...state, {datapoints: action.datapoints});
    case LOAD_AXIS_INTO_STATE:
      return Object.assign({}, {...state}, {axis: action.axis});
    default:
      return state
  }
}
