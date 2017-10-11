import React from 'react';
import {
  Box,
  Animated,
  Text
} from 'react-vr';

class DataReadout extends React.Component {
  constructor (props) {
    super (props);
  }

  render() {
    const { vrX, vrY, vrZ, orig } = this.props.readout;
    orig.dontPrint = 'dontPrint'; // bug: does not print the last property of orig
    //quickFix: append a dontPrint property
    let keys = Object.keys(orig);
    return (
      <Text
        style={{
						backgroundColor: '#00000080',
            fontSize: 1,
            color: 'red',
            position: 'absolute',
            transform: [{translate: [vrX, vrY, vrZ]}],
					}}
      >
      {
        keys.map(key => {
          return `${key}: ${orig[key]}` + '\n'
        })
      }
      </Text>)
  }
}

export { DataReadout };
