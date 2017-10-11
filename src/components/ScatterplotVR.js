import React, { Component } from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  Box,
  Animated,
  Scene,
  Plane,
} from 'react-vr';
// React-redux and store methods
import { connect } from 'react-redux'
import { loadDatapointsIntoState, loadAxisIntoState } from '../store';
// Common components
import { Cube, MovingCube } from './common';
// Helper methods
import { createRandomCubes } from '../helpers/randomCubes';
// Loader
import Converter from '../loader/Converter';
import mockData from '../../static_assets/mockData.json';

class ScatterplotVR extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // TODO: datapoints below is just a scaffold to load mock data in
    // TODO: we should move it into a redux thunk for datapoints
    //const datapoints = createRandomCubes(200);
    let converter = new Converter(mockData);
    const mockDataToRender = converter.toVRCoor();
    console.log(mockDataToRender);
    this.props.loadDatapointsIntoState(mockDataToRender);
    this.props.loadAxisIntoState(converter.getVRAxisLineCoordinates());
  }

  render() {
    return (
      <Scene style= {{
        transform: [
          {translate: [0, 0, 0]},
          //{rotateZ: 45}
        ]
      }}>
      <MovingCube cube={{width:2, height:2, depth:2, x:-5, y:5, z: -10}} />
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View>
          {
            this.props.model.datapoints && this.props.model.datapoints.map( (cube, index) => {
              return (<Cube key={index} cube={{...cube}} />);
            })
          }

          {
            this.props.model.axis && this.props.model.axis.map( (axis, index) => {
              return (<Cube key={index} cube={{...axis, color: 'red'}} />);
            })
          }
        </View>
        <Plane
          dimWidth={10}
          dimHeight={10}
          style={{
            transform: [{translate: [5, 5, -40]}],
            color: 'green'
          }}
        />
      </View>
    </Scene>
  )
}
};

const mapStateToProps = state => {
  return {
    model: { 
      datapoints: state.model.datapoints,
      axis: state.model.axis
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadDatapointsIntoState: (datapoints) => {
      dispatch(loadDatapointsIntoState(datapoints))
    },
    loadAxisIntoState: (axis) => {
      dispatch(loadAxisIntoState(axis))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ScatterplotVR)
