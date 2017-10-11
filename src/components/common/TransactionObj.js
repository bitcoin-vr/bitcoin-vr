import React from 'react';
import {
  Box,
  Animated,
  View,
  Model,
  asset,
  Text
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
        duration: 400000
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
      case (transactionVolume < 0.5):
        width = depth = height = 3;
        color = 'red'
        break;
      case (0.5 <= transactionVolume < 1):
        width = depth = height = 10;
        color = 'green'
        break;
      case (1 <= transactionVolume < 5):
        width = depth = height = 20;
        color = 'orange'
        break;
      case (5 <= transactionVolume < 10):
        width = depth = height = 75;
        color = 'yellow'
        break;
      case (10 <= transactionVolume < 100):
        width = depth = height = 150;
        color = 'blue'
        break;
      case (transactionVolume >= 100):
        width = depth = height = 300;
        color = 'purple'
        break;
      default:
        width = depth = height = 3;
        break;
    }

    return (
      <Animated.View style={{
        transform: [
          { translate: [this.state.x, 0, this.state.z] },
          { translateY: this.state.y }
        ]
      }}>
        <Model
          lit
          source={{
            obj: asset('Air_Balloon.obj'),
          }}
          color={color}
          style={{
            transform: [
              { scale: width / 3 },
              { translate: [0, 0, 0] }
            ]
          }}
        >
          <Text>
            {transactionVolume}
          </Text>
        </Model>
        <Box
          lit
          dimWidth={width || 30}
          dimDepth={width || 30}
          dimHeight={width || 30}
          style={{
            transform: [
              { translate: [0, -width / 2 + 1, 0] }
            ],
            color: color
          }}
        />


      </Animated.View>)
  }
}

export { TransactionObj };