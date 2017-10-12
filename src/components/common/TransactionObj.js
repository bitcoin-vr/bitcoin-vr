import React from 'react';
import {
  Box,
  Animated,
  View,
  Model,
  asset,
  Text
} from 'react-vr';
import { DataReadout } from './DataReadout';
import { Zeppelin, HotAirBalloon } from './index';

class TransactionObj extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, z, volume, color, scale, model } = this.props.transaction;
    const base = 5;
    return (
      <View>
        {
          model === 'zeppelin'
            ? (
              <Zeppelin transaction={this.props.transaction}/>
            )
            : (
              <HotAirBalloon transaction={this.props.transaction} />
            )
        }
        </View>
    )
  }
}

export { TransactionObj };