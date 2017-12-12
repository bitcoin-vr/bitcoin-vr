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
        duration: 40000
      }
    ).start()
  }

  toggleReadoutVisible() {
    this.state.readoutVisible
      ? this.setState({ readoutVisible: false })
      : this.setState({ readoutVisible: true })
  }

  render() {
    const { x, z, color, modelColor, scale, radial } = this.props.transaction.display;
    const { transactionSize } = this.props.transaction
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

            style={{
              color: modelColor,
              transform: [
                { scale: scale },
                { translate: [0, 0, 0] }
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
              { translate: [0, -base * scale / 2 + 1, 0] }
            ],
            color: color
          }}
        />
        {
          this.state.readoutVisible && transactionSize && <HoverBox readout={{
            radial,
            scale,
            x,
            y: this.state.y,
            z,
            transaction: this.props.transaction
          }} />
        }
      </Animated.View>)
  }
}

export { HotAirBalloon };
