import React from 'react';
import {
  Box,
  Animated,
  View
} from 'react-vr';

class MovingCube extends React.Component {
  
  constructor (props) {
    super (props);
    this.state = {
      y: new Animated.Value(0)
    }
    this.animate = this.animate.bind(this);
  }

  componentDidMount () {
    this.animate();
  }

  animate () {
    Animated.sequence([
      Animated.timing(
        this.state.y,
        {
          toValue: 10,
          duration: 3000
        }
      ),
      Animated.timing(
        this.state.y,
        {
          toValue: 0,
          duration: 3000,
        }
      )
    ]).start(() => {
      this.animate();
  })}

  render() {
    const { width, height, depth, x, y, z } = this.props.cube;
    return (
      <Animated.View style = {{ 
        transform: [
          {translate: [x, y, z]},
          {translateY: this.state.y}
        ]
      }}>
        <Box
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
          style={{
						color: 'white'
					}}
        />
      </Animated.View>)
  }
}

export { MovingCube };