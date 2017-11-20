import React from 'react';
import {
  Box,
  Animated,
  View,
  Model,
  asset,
  Text
} from 'react-vr';
import { Zeppelin, HotAirBalloon } from './index';

class TransactionObj extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { model } = this.props.transaction.display;
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