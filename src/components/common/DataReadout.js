import React from 'react';
import {
  Box,
  Animated,
  Text,
  View,
  StyleSheet
} from 'react-vr';

// Layout props
const _panelHeight = 30
const _panelWidth = 40;

class DataReadout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { vrX, vrY, vrZ, orig, boxSize } = this.props.readout;
    const { price, volume, exchange_id, market_id } = orig;

    // Calculate USD value
    // TODO: refactor this to the Redux store (instead of calculating during every re-render)
    let usd = (volume * price);
    usd = usd.toFixed(2);

    return (
      <View
        billboarding={'on'}
        style={styles.container}
      >
        <Text
          style={styles.transactionVolume}
        >
          {
            `${volume.toFixed(1)}\n`
          }
        </Text>
        <Text
          style={styles.transactionValue}
        >
          {
            `USD ${usd}\n`
          }
        </Text>
        <Text
          style={styles.transactionExchange}
        >
          {
            `${capitalizeFirstLetter(exchange_id)}`
          }
        </Text>
      </View>
    )
  }
}

// Helper for capitalization
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000080',
    position: 'absolute',
    height: _panelHeight,
    width: _panelWidth,
    flexDirection: 'column',
    transform: [
      { translate: [-_panelWidth / 2, -_panelHeight / 10, 0] },
      { scale: 4 }
    ],
    borderRadius: 1,
    justifyContent: 'flex-start',
  },
  transactionVolume: {
    flex: 2,
    fontSize: 10,
    color: 'white',
    width: _panelWidth,
    textAlign: 'center',
    fontWeight: '400'
  },
  transactionValue: {
    flex: 1,
    fontSize: 4,
    color: 'white',
    width: _panelWidth,
    textAlign: 'center'
  },
  transactionExchange: {
    flex: 1,
    fontSize: 4,
    color: 'white',
    width: _panelWidth,
    textAlign: 'center'
  }
})

export { DataReadout };
