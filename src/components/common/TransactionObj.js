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
    const z = Math.floor(Math.random() * -180) + -40;
    this.setState({ x, z });
  }

  animate() {
    Animated.timing(
      this.state.y,
      {
        toValue: 300,
        duration: 100000
      }
    ).start()
  }

  render() {
    const { x, z, volume, color, scale } = this.props.transaction;
    const base = 20;

    return (
      <Animated.View style={{
        transform: [
          { translate: [x, 0, z] },
          { translateY: this.state.y }
        ]
      }}>
        <Model
          lit
          texture={asset('gold_texture.jpg')}
          source={{
            obj: asset('Air_Balloon.obj'),
          }}
          color={color}
          style={{
            transform: [
              { scale: scale },
              { translate: [0, 0, 0] }
            ]
          }}
        >
          <Text>
            {volume}
          </Text>
        </Model>
        <Box
          lit
          dimWidth={base*scale || 30}
          dimDepth={base*scale || 30}
          dimHeight={base*scale || 30}
          style={{
            transform: [
              { translate: [0, -base*scale / 2 + 1, 0] }
            ],
            color: color
          }}
        />
      </Animated.View>)
  }
}

export { TransactionObj };