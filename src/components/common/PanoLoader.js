import React from 'react';
import {
  Animated,
  View,
  Pano,
  asset
} from 'react-vr';

class PanoLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    }
    this.onLoad = this.onLoad.bind(this);
    this.onThumbnailLoad = this.onThumbnailLoad.bind(this);
  }

  onLoad() {
    console.log("loaded blurry");
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 250
      }
    ).start();
  }

  onThumbnailLoad() {
    console.log("loaded full");
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 250
      }
    ).start();
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            opacity: this.state.opacity
          }}>
          <Pano
            onLoad={this.onLoad()}
            source={asset('lake-blurred.jpg')} />
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.opacity
          }}>
          <Pano
            onLoad={this.onThumbnailLoad()}
            source={asset('lake-large.jpg')} />
        </Animated.View>
      </View>
    );
  }
}

export { PanoLoader };
