import React from 'react';
import {
  Box,
  Animated,
  View,
  Model,
  asset,
  Text
} from 'react-vr';
import { HoverBox } from './HoverBox'

class Zeppelin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(-10),
      // x: new Animated.Value(props.x),
      // xMoveTo: props.x +
      // readoutVisible: false
      rotation: Math.floor(Math.random()*360)
    }
    this.animate = this.animate.bind(this);
    this.toggleReadoutVisible = this.toggleReadoutVisible.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(
      this.state.y,
      {
        toValue: 1000,
        duration: 100000
      }
    ).start()
  }

//   animateX() {
//     Animated.timing(
//       this.state.y,
//       {
//         toValue: 100,
//         duration: 100000
//       }
//     ).start()
//   }
// }

toggleReadoutVisible() {
  this.state.readoutVisible
    ? this.setState({ readoutVisible: false })
    : this.setState({ readoutVisible: true })
}

render() {
  const { x, z, color, scale } = this.props.transaction.display;
  const { transactionSize } = this.props.transaction
  const base = 5;
  return (
    <Animated.View
      onEnter={() => this.toggleReadoutVisible()}
      onExit={() => this.toggleReadoutVisible()}
      style={{
        transform: [
          { translate: [x, -10, z] },
          { translateY: this.state.y },
          // { rotateY: this.state.rotation}
        ]
      }}>
      {
        <Model
          lit
          texture={asset('gold_texture.jpg')}
          source={{
            obj: asset('Low-Poly_airship.obj'),
          }}
          color={color}
          style={{
            transform: [
              { scale: 0.2 },
              { translate: [0, 100, 0] }
            ]
          }}
        >
          <Text>
            {transactionSize}
          </Text>
        </Model>

      }
      <Box
        lit
        dimWidth={base * scale || 30}
        dimDepth={base * scale || 30}
        dimHeight={base * scale || 30}
        style={{
          transform: [
            { translate: [0, -base * scale / 2 + 1, 0] },
            { rotateY: this.state.rotation}
          ],
          color: color
        }}
      />
      {
        this.state.readoutVisible && transactionSize && <HoverBox readout={{
          boxSize: base * scale || 30,
          x,
          y: this.state.y,
          z,
          transaction: this.props.transaction
        }} />
      }
    </Animated.View>)
}
}

export { Zeppelin };
