import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-vr';

import BlockchainInfo from './BlockchainInfo.js'

// Layout props
const _panelHeight = 30
const _panelWidth = 60;

function InfoPanel(props) {

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>

        <View style={styles.container_title}>
          <Text style={styles.text_title}>
            Bitcoin-VR
          </Text>
        </View>

        <View style={styles.container_key}>
          <View style={styles.container_keyItem}>
            <Text style={styles.text_smallRightAlign}>
              {`Balloon < 50 BTC`}
            </Text>
          </View>
          <View style={styles.container_keyItemBottom}>
            <Text style={styles.text_smallRightAlign}>
              {`Zeppelin >= 50 BTC`}
            </Text>
          </View>
        </View>

      </View>

      <View style={{ alignItems: 'center' }}>
        <BlockchainInfo />
      </View>

      <View style={styles.container_footer}>
        <View style={styles.container_keyItem}>
          <Text style={styles.text_smallRightAlign}>
            {`We are using experimental technologies that may not work on some browsers`}
          </Text>
        </View>
        <View style={styles.container_keyItemBottom}>
          <Text style={styles.text_smallRightAlign}>
            {`Created by Robin K Wilson, Dan`}
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  // for future buttons to change current cryptocurrency
  currencyButton: {
    margin: 0.02,
    padding: 0.02,
    backgroundColor: 'green',
  },
  container: {
    position: 'absolute',
    transform: [
      { translate: [-1.25, 4.5, -2] },
      { rotateX: -25 }
    ],
    borderWidth: 0.01,
    borderColor: '#858585',
    backgroundColor: '#000000CC',
  },
  container_header: {
    width: 2.5,
    flexDirection: 'row',
  },
  container_title: {
    width: 1,
    paddingLeft: 0.1,
    marginBottom: -0.05
  },
  text_title: {
    textAlign: 'left',
    fontSize: .15,
  },
  container_key: {
    width: 1.4,
    marginBottom: -0.05
  },
  container_keyItem: {
    marginTop: 0.01,
    marginBottom: -0.03
  },
  container_keyItemBottom: {
    marginBottom: 0.05
  },
  text_smallRightAlign: {
    textAlign: 'right',
    fontSize: 0.06,
    marginBottom: 0.02
  },
  container_footer: {
    marginRight: 0.05,
  }
});

export { InfoPanel };
