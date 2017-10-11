import React, { Component } from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  Box,
  Animated,
  Scene,
  Plane,
  AmbientLight,
  PointLight
} from 'react-vr';
import io from 'socket.io-client'
// React-redux and store methods
import { connect } from 'react-redux'
import { 
  loadDatapointsIntoState, 
  loadAxisIntoState, 
  loadTransactionsIntoState 
} from '../store';
// Common components
import { TransactionObj, Cube, MovingCube } from './common';

class BlockstreamVR extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // TODO: datapoints below is just a scaffold to load mock data in
    // TODO: we should move it into a redux thunk for datapoints
    this.props.loadTransactionsIntoState()
  }

  render() {
    console.log(this.props.blockchainTransactions)
    return (
      <Scene style= {{
        transform: [
          {translate: [0, 0, 0]},
          //{rotateZ: 45}
        ]
      }}>
      <View>
        <Pano source={asset('lake-large.jpg')}/>
        <PointLight 
          style={{
            color: 'white',
            transform: [
              {translate: [0,0,0]}
            ]
          }}
        />
        <View>
          {
            this.props.blockchainTransactions && this.props.blockchainTransactions.map( (transaction, index) => {
              return (
                <TransactionObj 
                  key={transaction.trade.data.timestamp_ms} 
                  transaction={{...transaction}} 
                />
              );
            })
          } 
        </View>
        <Plane
          dimWidth={10}
          dimHeight={10}
          style={{
            transform: [{translate: [5, 5, -40]}],
            color: 'green'
          }}
        />
      </View>
    </Scene>
  )
}
};

const mapStateToProps = state => {
  return {
    blockchainTransactions: state.blockchainTransactions.transactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactionsIntoState: () => {
      dispatch(loadTransactionsIntoState())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlockstreamVR)
