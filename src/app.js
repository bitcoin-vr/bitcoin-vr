import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  // Box,
  // Animated,
  // Scene,
  // Plane,
} from 'react-vr';

// React-redux Imports
import { Provider } from 'react-redux'
import store from './store'
// Components
// import ScatterplotVR from './components/ScatterplotVR'
import BlockstreamVR from './components/BlockstreamVR'

export default class App extends React.Component {
  render() {
    //const cube = { key, width, height, depth, x, y, z, upDown}
    return (
      <Provider store={store}>
         <BlockstreamVR /> 
      </Provider>
    )
  }
}
