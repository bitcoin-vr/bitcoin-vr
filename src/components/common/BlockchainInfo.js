import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-vr';

import { connect } from 'react-redux';

// Layout props
const _panelHeight = 30
const _panelWidth = 60;

function BlockchainInfo(props) {

  const curCurrency = 'BTC'
  const { largest, total, last } = props;
  const roundBTC = 3; // will round to 3 decimal places
  const roundUSD = 2; // will round to 2 decimal places


  return (
    <View style={styles.container}>
      <View style={styles.container_totalLargestNewest}>
        <Text style={styles.listItem}>Total</Text>
        <Text style={styles.listItem}>Largest</Text>
        <Text style={styles.listItem}>Newest</Text>
      </View>

      <View style={styles.container_numberValues}>
        <Text style={styles.text_numberValues}>{`${curCurrency} ${formatNumber(total[0], roundBTC)}`}</Text>
        <Text style={styles.text_numberValues}>{`${curCurrency} ${formatNumber(largest[0], roundBTC)}`}</Text>
        <Text style={styles.text_numberValues}>{`${curCurrency} ${formatNumber(last[0], roundBTC)}`}</Text>
      </View>

      <View style={styles.container_numberValues}>
        <Text style={styles.text_numberValues}>{`$ ${formatNumber(total[1], roundUSD)}`}</Text>
        <Text style={styles.text_numberValues}>{`$ ${formatNumber(largest[1], roundUSD)}`}</Text>
        <Text style={styles.text_numberValues}>{`$ ${formatNumber(last[1], roundUSD)}`}</Text>
      </View>
    </View>
  )
}

function formatNumber(number, decimalPlaces) {
  return number.toFixed(decimalPlaces).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  container_totalLargestNewest: {
    width: 0.4,
    flexDirection: 'column',
    padding: 0,
    paddingRight: 0.05,
    margin: 0
  },
  listItem: {
    textAlign: 'right',
    padding: 0,
    margin: 0,
    height: 0.12
  },
  container_numberValues: {
    width: 0.8,
  },
  text_numberValues: {
    textAlign: 'left',
    height: 0.12
  }
})

const mapStateToProps = state => {
  return {
    largest: state.blockchainTransactions.largest,
    total: state.blockchainTransactions.total,
    last: state.blockchainTransactions.last
  }
}

export default connect(mapStateToProps)(BlockchainInfo);

