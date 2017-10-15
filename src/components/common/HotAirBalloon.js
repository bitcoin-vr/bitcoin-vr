import React from 'react';
import {
  Box,
  Animated,
  View,
  Model,
  asset,
  Text
} from 'react-vr';
import { DataReadout } from './DataReadout'

class HotAirBalloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(-10),
      readoutVisible: false
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
        duration: 200000
      }
    ).start()
  }

  toggleReadoutVisible() {
    this.state.readoutVisible
      ? this.setState({ readoutVisible: false })
      : this.setState({ readoutVisible: true })
  }

  render() {
    const { x, z, volume, color, scale } = this.props.transaction;
    const base = 5;

    return (
      <Animated.View
        onEnter={() => this.toggleReadoutVisible()}
        onExit={() => this.toggleReadoutVisible()}
        style={{
          transform: [
            { translate: [x, 0, z] },
            { translateY: this.state.y }
          ]
        }}>
        {
          <Model
            lit
            // texture={asset('gold_texture.jpg')}
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
        }

        <Box
          lit
          dimWidth={base * scale || 30}
          dimDepth={base * scale || 30}
          dimHeight={base * scale || 30}
          style={{
            transform: [
              { translate: [0, -base * scale / 2 + 1, 0] }
            ],
            color: color
          }}
        />
        {
          this.state.readoutVisible && volume && <DataReadout readout={{
            boxSize: base * scale || 30,
            x,
            y: this.state.y,
            z,
            orig: this.props.transaction
          }} />
        }
      </Animated.View>)
  }
}

export { HotAirBalloon };