import React from 'react';

// React-Redux Imports
import { Provider } from 'react-redux'
import store from './store'

import BlockstreamVR from './components/BlockstreamVR'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <BlockstreamVR /> 
      </Provider>
    )
  }
}
