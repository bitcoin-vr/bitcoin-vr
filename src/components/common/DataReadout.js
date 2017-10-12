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
    const { vrX, vrY, vrZ, orig, boxSize } = this.props.readout;
    const { price, volume, exchange_id, market_id } = orig;
    console.log(typeof price, typeof volume);

    let usd = (volume * price);
    usd = usd.toFixed(2);

    return (
      <View
        billboarding={'on'}

      >
        <Text
          style={{
            backgroundColor: '#00000080',
            fontSize: 1,
            color: 'white',
            position: 'absolute',
            width: 10,
            transform: [
              { translate: [-10, - boxSize - 3, boxSize] },
              { scale: 4 }
            ],
          }}
        >
          {
            `BTC: ${volume.toFixed(2)}\nUSD Value: ${usd}\nExchange: ${market_id}`
          }
        </Text>
      </View>
    )
  }
}

export { DataReadout };
