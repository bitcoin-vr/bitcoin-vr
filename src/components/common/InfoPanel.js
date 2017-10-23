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
          width: 2.5,
          flexDirection: 'row',
        }}>
          <View style={{
            width: 1,
            paddingLeft: 0.1,
            marginBottom: -0.05
          }}>
            <Text style={{
              textAlign: 'left',
              fontSize: .15,
            }}>
              Blockchain-VR
            </Text>
          </View>

          <View style={{
            alignItems: 'flex-end',
            width: 1.4,
            marginBottom: -0.05
          }}>
            <View style={{
              marginTop: 0.01,
              marginBottom: -0.03
            }}>
              <Text style={{
                textAlign: 'right',
                fontSize: 0.08,
              }}>
                {`Balloon < 1 BTC`}
              </Text>
            </View>
            <View style={{
              marginBottom: 0.05
            }}>
              <Text style={{
                textAlign: 'right',
                fontSize: 0.08,
              }}>
                {`Zeppelin >= 1 BTC`}
              </Text>
            </View>
          </View>
        </View>

        <View style={{
          alignItems: 'center',
        }}>
          <BlockchainInfo />
        </View>

        <View style={{
          marginRight: 0.05,
        }}>
          <View style={{
            marginBottom: -0.03
          }}>
            <Text style={{
              textAlign: 'right',
              fontSize: 0.08,
            }}>
              {`Created by Daniel Ong, Robin Wilson, Jing Jia`}
            </Text>
          </View>
          <View style={{
            marginBottom: 0.05
          }}>
            <Text style={{
              textAlign: 'right',
              fontSize: 0.08,
            }}>
              {`github.com/data-VR/blockchain-vr`}
            </Text>
          </View>
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
