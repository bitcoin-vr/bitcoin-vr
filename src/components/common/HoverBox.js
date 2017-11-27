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

class HoverBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { exchangeRate, transactionSize, transactionUSD, hash } = this.props.readout.transaction;
    const { radial, scale } = this.props.readout
    console.log(radial)
    console.log(scale)
    
    return (
      <View
        billboarding={'on'}
        style={{
          backgroundColor: '#00000080',
          position: 'absolute',
          height: radial/3,
          width: radial/3,
          flexDirection: 'column',
          transform: [
            { translate: [-radial/6, -radial/30, 0] },
            { scale: 4 }
          ],
          borderRadius: 1,
          justifyContent: 'flex-start',
        }}
      >
        <Text
          style={{
            flex: 2,
            fontSize: radial/11,
            color: 'white',
            width: radial/3,
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
            fontSize: radial/27,
            color: 'white',
            width: radial/3,
            textAlign: 'center'
          }}
        >
          {
            `USD ${transactionUSD}\n`
          }
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: radial/54,
            color: 'white',
            width: radial/3,
            textAlign: 'center',
          }}
        >
          {
            `${hash}`
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
  transactionVolume: {
    
  },
  transactionValue: {
    
  },
  transactionHash: {
    
  }
})

export { HoverBox };
