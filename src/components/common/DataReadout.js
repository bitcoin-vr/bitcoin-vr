import React from 'react';
import {
  Box,
  Animated,
  Text,
  View
} from 'react-vr';

class DataReadout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { vrX, vrY, vrZ, orig } = this.props.readout;
    const { price, volume, exchange_id, market_id } = orig;

    return (
      <View
        billboarding={'on'}

      >
        <Text
          style={{
            backgroundColor: '#00000080',
            fontSize: 0.3,
            color: 'white',
            position: 'absolute',
            width: 10,
            transform: [
              { translate: [-10, -10, 10] },
              { scale: 4 }
            ],
          }}
        >
          {
            `BTC: ${volume.toFixed(2)}\n
            USD Value: ${volume * price.toFixed(2)}\n
            Exchange: ${market_id}\n
            `
          }
        </Text>
      </View>
    )
  }
}

export { DataReadout };
