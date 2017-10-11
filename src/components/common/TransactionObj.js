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
    // PURPLE : > 1000 BTC
    // BLUE : 100 - 1000 BTC
    // YELLOW : 50 - 100 BTC
    // ORANGE : 10 - 50 BTC
    // GREEN : 1 - 10 BTC
    // RED : < 1 BTC
    let width, depth, height, color;
    
    switch (true) {
      case (transactionVolume < 1):
        width = depth = height = 3;
        color = 'red'
        break;
      case (1 <= transactionVolume < 10):
        width = depth = height = 10;
        color = 'green'
        break;
      case (10 <= transactionVolume < 50):
        width = depth = height = 30;
        color = 'orange'
        break;
      case (50 <= transactionVolume < 100):
        width = depth = height = 75;
        color = 'yellow'
        break;
      case (100 <= transactionVolume < 1000):
        width = depth = height = 150;
        color = 'blue'
        break;
      case (transactionVolume >= 1000):
        width = depth = height = 300;
        color = 'purple'
        break;
      default: 
        width = depth = height = 3;
        break;
    }
    
    


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
            obj: asset('Air_Balloon.obj'),
            mtl: asset('Air_Balloon.mtl')
          }}
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
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