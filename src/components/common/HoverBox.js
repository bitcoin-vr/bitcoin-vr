import React from 'react';
import {
  Box,
  Animated,
  Text,
  View,
  StyleSheet,
  VrButton
} from 'react-vr';

// Layout props
const _panelHeight = 30
const _panelWidth = 40;

class HoverBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { exchangeRate, transactionSize, transactionUSD, hash } = this.props.readout.transaction;
    const { radial, scale } = this.props.readout

    return (
      <View
        billboarding={'on'}
        style={{
          backgroundColor: '#00000080',
          position: 'absolute',
          height: radial / 3,
          width: radial / 3,
          flexDirection: 'column',
          transform: [
            { translate: [-radial / 6, -radial / 30, 0] },
            { scale: 4 }
          ],
          borderRadius: 1,
          justifyContent: 'flex-start',
        }}
      >
        <Text
          style={{
            flex: 2,
            fontSize: radial / 11,
            color: 'white',
            width: radial / 3,
            textAlign: 'center',
            fontWeight: '400'
          }}
        >
          {
            `${transactionSize.toFixed(2)}\n`
          }
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: radial / 27,
            color: 'white',
            width: radial / 3,
            textAlign: 'center'
          }}
        >
          {
            // See https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
            `USD ${transactionUSD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`  
          }
        </Text>
        <VrButton
          style={{
            flex: 1,
            width: radial/3,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: radial /70,
              color: 'white',
              textAlign: 'center',
              color: "yellowgreen",
              marginLeft: radial/50,
              marginRight: radial/50,
              marginBottom: radial/50,
              paddingLeft: radial/60,
              paddingRight: radial/60,
              paddingTop: radial/80,
              paddingBottom: radial/80,
              borderRadius: radial/70,
              textAlign: 'center',
              textAlignVertical: 'center'

            }}
          >
            {
              `${hash}`
            }
          </Text>
        </VrButton>

      </View>
    )
  }
}

// Helper for capitalization
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { HoverBox };
