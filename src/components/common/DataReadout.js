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
    const { vrX, vrY, vrZ, orig } = this.props.readout;
    orig.dontPrint = 'dontPrint'; // bug: does not print the last property of orig
    //quickFix: append a dontPrint property
    let keys = Object.keys(orig);

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
            height: 40,
            transform: [
              { translate: [-10, -10, 10] },
              { scale: 4 }
            ],
          }}
        >
          {
            keys.map(key => {
              return `${key}: ${orig[key]}` + '\n'
            })
          }
        </Text>
      </View>
    )
  }
}

export { DataReadout };
