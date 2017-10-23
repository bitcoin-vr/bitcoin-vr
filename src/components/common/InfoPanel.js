import React from 'react';
import {
  Box,
  Animated,
  Text,
  View,
  StyleSheet,
  VrButton
} from 'react-vr';

import { connect } from 'react-redux';

import BlockchainInfo from './BlockchainInfo.js'

// Layout props
const _panelHeight = 30
const _panelWidth = 60;

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);


  }

  selectCurrency() {
    // select which currency you'd like to render
  }

  render() {
    // const { vrX, vrY, vrZ, orig, boxSize } = this.props.readout;
    // const { price, volume, exchange_id, market_id } = orig;

    // let usd = (volume * price);
    // usd = usd.toFixed(2);

    return (
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        transform: [
          { translate: [-1.5, 0, -2] },
          { rotateX: -20 }
        ]
      }} >

        <View
          style={{
            flexDirection: 'column',
          }} >
          <VrButton style={styles.currencyButton}>
            <Text>BTC</Text>
          </VrButton>
          <VrButton style={styles.currencyButton}>
            <Text>ETC</Text>
          </VrButton>
          <VrButton style={styles.currencyButton}>
            <Text>LTC</Text>
          </VrButton>
          <VrButton style={styles.currencyButton}>
            <Text>ZEC</Text>
          </VrButton>
        </View>

        <View style={{
          backgroundColor: 'black',
          padding: 0.02,
          width: 3,
          height: 0.8
        }}>
          <Text>
            Blockchain-VR
          </Text>

          <BlockchainInfo />

          <Text style={{
            textAlign: 'right',
            textAlignVertical: 'bottom',
            fontSize: 0.08
          }}>
            {`Created by Daniel Ong, Robin Wilson, Jing Jia \n github.com/data-VR/blockchain-vr`}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  currencyButton: {
    margin: 0.02,
    padding: 0.02,
    backgroundColor: 'green',
  },
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

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);
