import React from 'react';
import {
  Box,
  View
} from 'react-vr';

import {DataReadout} from './DataReadout'

class Cube extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      readoutVisible: false,
    }

    this.toggleReadoutVisible = this.toggleReadoutVisible.bind(this);
  }

  toggleReadoutVisible () {
    this.state.readoutVisible 
    ? this.setState( { readoutVisible: false } )
    : this.setState( { readoutVisible: true } )
  }

  render() {
    const { width, height, depth, vrX, vrY, vrZ, orig, color } = this.props.cube;
    return (
      <View style={{position: 'absolute'}}>
        <Box
          onEnter = {() => this.toggleReadoutVisible()}
          onExit = {() => this.toggleReadoutVisible()}
          dimWidth={width || .2}
          dimDepth={depth || .2}
          dimHeight={height || .2}
          wireframe={true}
          style={{
              transform: [{translate: [vrX, vrY, vrZ]}],
              color: color || 'blue',
              position: 'absolute'
            }}
        />
        {
          this.state.readoutVisible && orig && <DataReadout readout={{vrX, vrY, vrZ, orig}}/>
        }
      </View>)
  }
}

export { Cube };
