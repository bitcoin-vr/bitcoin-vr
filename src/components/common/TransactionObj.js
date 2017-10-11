import React from 'react';
import {
  Box,
  Animated,
  View,
  Model,
  asset
} from 'react-vr';

class TransactionObj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(-10),
    }
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate();
    const x = Math.floor(Math.random() * (200 - -200 + 1)) + -200;
    const z = Math.floor(Math.random() * (200 - -200 + 1)) + -200;
    this.setState({ x, z });
  }

  animate() {
    Animated.timing(
      this.state.y,
      {
        toValue: 1000,
        duration: 100000
      }
    )
      .start()
  }

  render() {
    const { transaction } = this.props;
    const transactionVolume = transaction.trade.data.volume

    const width = depth = height = 7;

    return (
      <Animated.View style={{
        transform: [
          { translate: [this.state.x, 0, this.state.z] },
          { translateY: this.state.y }
        ]
      }}>
        <Model
          scale={1}
          source={{
            obj: asset('Air_Balloon.obj')
          }}
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
          texture={asset('bfx-stacked.png')}
          style={{
            color: 'white',
            transform: [
              {
                translate: [0, 0, 0]
              }]
          }}  
          />
      <Box
          dimWidth={width || 30}
        dimDepth={width || 30}
        dimHeight={width || 30}
        style={{
          color: 'white'
        }}
        />


      </Animated.View>)
  }
}

export { TransactionObj };