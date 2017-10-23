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
        position: 'absolute',
        transform: [
          { translate: [-1.25, -0.5, -2] },
          { rotateX: -25 }
        ],
        borderWidth: 0.01,
        borderColor: '#FFFFFF80',
        backgroundColor: '#000000CC',

      }}>

      <View style={{
        padding: 0.05,
        width: 2.5,
        flexDirection: 'row',
      }}>
        <View style={{
          width: 1,
          paddingLeft: 0.05
        }}>
          <Text style={{
            textAlign: 'left',
            fontSize: .15,
          }}>
            Blockchain-VR
          </Text>
        </View>
        
        <View style={{
          alignItems: 'flex-end'
        }}>
          <Text style={{
            textAlign: 'right',
            width: 1.2,
          }}>
            {`Balloon < 1 BTC\nZeppelin >= 1 BTC`}
          </Text>
        </View>
      </View>
        <View style={{
          alignItems: 'center'
        }}>
        <BlockchainInfo />
        </View>
        <View style={{
          paddingRight: 0.05,
          paddingBottom: 0.05
        }}>
          <Text style={{
            textAlign: 'right',
            textAlignVertical: 'bottom',
            fontSize: 0.08,
            paddingBottom: -0.03
          }}>
            {`Created by Daniel Ong, Robin Wilson, Jing Jia`}
          </Text>
          <Text style={{
            textAlign: 'right',
            textAlignVertical: 'bottom',
            fontSize: 0.08,
            paddingTop: -0.01
          }}>
            {`github.com/data-VR/blockchain-vr`}
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
