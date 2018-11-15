import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import moment from 'moment';
import TrackPlayer from 'react-native-track-player';

import Images from '@assets/images';

const width = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
  timeBar: {
    flex: 10,
    width,
    marginHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row',
    position: 'relative',
  },
  tick: {
    position: 'absolute',
  },
  tickContainer: {
    position: 'absolute',
    top: -9,
    width: 40,
    height: 40,
  },
  time: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    position: 'absolute',
  },
});

export default class TimeBar extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      dragging: false,
    };
  }

  // static getDerivedStateFromProps = (props, state) => {
  //   const newState = state;
  //
  //   if (props !== undefined) {
  //     if (props.totalTime !== -1) newState.totalTime = props.totalTime;
  //
  //     const x = (props.currentTime / state.totalTime) * width;
  //     if (!state.dragging) newState.x = x;
  //   }
  //
  //   return newState;
  // }

  getTickBoxStyle = () => ({
    left: this.state.x - 17,
  })

  getTickStyle = () => {
    let style = {
      width: 9,
      height: 9,
      top: 15,
      left: 15,
    };

    if (this.state.dragging) {
      style = {
        width: 17,
        height: 17,
        top: 11,
        left: 11,
      };
    }

    return style;
  }

  getTime = () => {
    let elem = null;

    if (this.state.dragging) {
      elem = (
        <Text style={[styles.time, {
          top: -20,
          left: this.state.x - 12,
        }]}>
          { moment(0).seconds(this.pxToSeconds(this.state.x)).format('m:ss') }
        </Text>
      );
    }

    return elem;
  }

  onStartShouldSetResponder = (e) => {
    this.dragging = true;
    this.setState({ dragging: true });

    this.drag = {
      x: e.nativeEvent.pageX,
    };

    return true;
  }

  onMoveShouldSetResponder = () => true

  setPosition = (e) => {
    const dx = this.state.x + (e.nativeEvent.pageX - this.drag.x);

    if (dx - 1 > 0 && dx < width) {
      this.setState({
        x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      });

      this.drag.x = e.nativeEvent.pageX;
    }
  }

  handleRelease = () => {
    this.setState({ dragging: false });
    this.props.setTime(this.pxToSeconds(this.state.x) * 1000);
  }

  pxToSeconds = pixels => (this.state.duration * pixels) / width

  render = () => (
      <View style={styles.timeBar}>
        <View style={[
          {
            height: 1,
            width: this.state.x,
            marginTop: 10,
            backgroundColor: '#fff',
          },
        ]}></View>
        { this.getTime() }
        <View style={[
          {
            height: 1,
            width: width - this.state.x,
            marginTop: 10,
            backgroundColor: '#999',
          },
        ]}></View>
        <View
          style={[styles.tickContainer, this.getTickBoxStyle()]}
          onResponderMove={this.setPosition}
          onResponderRelease={this.handleRelease}
          onStartShouldSetResponder={this.onStartShouldSetResponder}
          onMoveShouldSetResponder={this.onMoveShouldSetResponder}>
          <Image source={Images.sliderButton}
            style={[styles.tick, this.getTickStyle()]}
          />
        </View>
      </View>
  )
}
