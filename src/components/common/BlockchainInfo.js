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

// Layout props
const _panelHeight = 30
const _panelWidth = 60;

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const curCurrency = 'BTC'
    //const curSymbol = 'B'
    const { largest, total, last } = this.props;
    console.log(this.props.largest);

    return (
      <View style={{
        flexDirection: 'row',
        padding: 0.02,
        alignItems: 'stretch',
      }}>
        <View style={{
          width: 0.4,
          flexDirection: 'column',
          padding: 0,
          paddingRight: 0.05,
          
        }}>
          <Text style={{textAlign: 'right', padding: 0, marginBottom: -0.028}}>Total</Text>
          <Text style={{textAlign: 'right', padding: 0, marginBottom: -0.028 }}>Largest</Text>
          <Text style={{textAlign: 'right', padding: 0, marginTop: -0.01}}>Newest</Text>
        </View>

        <View style={{
          width: .8,
        }}>
          <Text style={{
            textAlign: 'left',
          }}>
            {`${curCurrency} ${total[0].toFixed(3)}\n ${curCurrency} ${largest[0].toFixed(3)}\n ${curCurrency} ${last[0].toFixed(3)}`}
          </Text>
        </View>

        <View style={{
          width: .8,
        }}>
          <Text style={{
            textAlign: 'left',
          }}>
            {`$ ${total[1].toFixed(2)}\n $ ${largest[1].toFixed(2)}\n $ ${last[1].toFixed(2)}`}
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
  console.log(state);
  return {
    largest: state.blockchainTransactions.largest,
    total: state.blockchainTransactions.total,
    last: state.blockchainTransactions.last
  }
}

export default connect(mapStateToProps)(BlockchainInfo);
