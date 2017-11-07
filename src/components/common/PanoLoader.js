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
      opacityBlurry: new Animated.Value(0),
      opacityLake: new Animated.Value(0),
      isBlurryLoaded: false,
      isLakeLoaded: false
    }
    this.onBlurryLoad = this.onBlurryLoad.bind(this);
    this.onLakeLoad = this.onLakeLoad.bind(this);
  }

  onBlurryLoad() {
    this.setState({ isBlurryLoaded: true });

    console.log("fade-in blurry");
    Animated.timing(
      this.state.opacityBlurry,
      {
        toValue: 1,
        duration: 250
      }
    ).start();
  }

  onLakeLoad() {
    console.log("fade-out blurry");
    this.setState({ isLakeLoaded: true });
    // Animated.timing(
    //   this.state.opacity,
    //   {
    //     toValue: 0,
    //     duration: 250
    //   }
    // ).start();


    Animated.parallel([
      Animated.timing(this.state.opacityBlurry, {
        toValue: 0,    // return to start
        duration: 250
      }),
      Animated.timing(this.state.opacityLake, {   // and twirl
        toValue: 1,
        duration: 250
      }),
    ]).start();
  }

  // blue => blue + blurry => blurry => blurry + large => large
  render() {
    const { isBlurryLoaded, isLakeLoaded, opacityBlurry, opacityLake } = this.state;
    return (
      <View>
        <Animated.View
          style={{
            opacity: 1
          }}>
          <Pano
            style={{
              opacity: 0.2
            }}
            onLoad={() => this.onBlurryLoad()}
            source={asset('lake-blurred.jpg')} />
        </Animated.View>
        {/* <Animated.View
          style={{
            opacity: opacityLake
          }}>
          <Pano
            onLoad={() => this.onLakeLoad()}
            source={asset('lake-large.jpg')} />
        </Animated.View> */}
      </View>
    );
  }
}

export { PanoLoader };
