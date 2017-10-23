import React, { Component } from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  Scene,
  Plane,
  //AmbientLight,
  PointLight
} from 'react-vr';

// React-redux and store methods
import { connect } from 'react-redux'
import io from 'socket.io-client';
import { 
  loadTransactionsIntoState 
} from '../store';
// Common components
import { TransactionObj } from './common';

class BlockstreamVR extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadTransactionsIntoState()
  }

  render() {
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
            this.props.blockchainTransactions 
            && this.props.blockchainTransactions.map( (transaction, index) => {
              return (
                <TransactionObj 
                  key={transaction.key} 
                  transaction={{...transaction}} 
                />
              );
            })
          } 
        </View>
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
