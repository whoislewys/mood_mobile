import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import moment from 'moment';
import TrackPlayer from 'react-native-track-player';
import Images from '@assets/images';
import { dimensions } from '../../../assets/styles';

const width = dimensions.width * 0.8;

const styles = StyleSheet.create({
  timeBar: {
    height: '100%',
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
    top: -10,
    width: 55,
    height: '140%',
    backgroundColor: 'transparent',
  },
  time: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    position: 'absolute',
  },
});

export default class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      dragging: false,
      duration: 180,
      position: 0,
    };
  }

  componentDidMount() {
    this._progressUpdates = true;
    this._updateProgress();
    this._timer = setInterval(this._updateProgress.bind(this), 300);
  }

  componentWillUnmount() {
    this._progressUpdates = false;
    clearInterval(this._timer);
  }

  async _updateProgress() {
    try {
      let duration = await TrackPlayer.getDuration();
      duration = (duration === 0 ? 180 : duration); // Stops duration of 0

      const data = {
        position: await TrackPlayer.getPosition(),
        duration,
      };

      if (this._progressUpdates) {
        this.setState(data);
      }
    } catch (e) {
      // The player is probably not initialized yet, we'll just ignore it
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.position !== this.state.position || prevState.duration !== this.state.duration) {
      const x = (this.state.position / this.state.duration) * width;
      if (!this.state.dragging) this.setState({ x });
    }
  };

  getTickBoxStyle = () => ({
    left: this.state.x - 17,
  });

  getTickStyle = () => {
    let style = {
      width: 12,
      height: 12,
      top: 15,
      left: 15,
    };

    if (this.state.dragging) {
      style = {
        width: 20,
        height: 20,
        top: 11,
        left: 11,
      };
    }

    return style;
  };

  getTime = () => {
    let elem = null;

    if (this.state.dragging) {
      elem = (
        <Text style={[styles.time, {
          top: -20,
          left: this.state.x - 12,
        }]}
        >
          { moment(0).seconds(this.pxToSeconds(this.state.x)).format('m:ss') }
        </Text>
      );
    }

    return elem;
  };

  onStartShouldSetResponder = (e) => {
    this.dragging = true;
    this.setState({ dragging: true });

    this.drag = {
      x: e.nativeEvent.pageX,
    };

    return true;
  };

  onMoveShouldSetResponder = () => true;

  setPosition = (e) => {
    const dx = this.state.x + (e.nativeEvent.pageX - this.drag.x);

    if (dx - 1 > 0 && dx < width) {
      this.setState({
        x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      });

      this.drag.x = e.nativeEvent.pageX;
    }
  };

  handleRelease = () => {
    this.setState({ dragging: false });
    this.props.setTime(this.pxToSeconds(this.state.x));
  };

  pxToSeconds = pixels => (pixels / width) * this.state.duration;

  render = () => {
    const animationStyle1 = {
      height: 3,
      borderRadius: 10,
      width: this.state.x,
      marginTop: 10,
      backgroundColor: '#fff',
    };

    const animationStyle2 = {
      height: 3,
      borderRadius: 10,
      width: width - this.state.x,
      marginTop: 10,
      backgroundColor: '#999',
    };

    return (
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      // TODO: for performance an Animated.View with useNativeDriver=true prop should be used here
      <View style={styles.timeBar}>
        <View style={animationStyle1} />
        { this.getTime() }
        <View style={animationStyle2} />
        <View
          style={[styles.tickContainer, this.getTickBoxStyle()]}
          onResponderMove={this.setPosition}
          onResponderRelease={this.handleRelease}
          onStartShouldSetResponder={this.onStartShouldSetResponder}
          onMoveShouldSetResponder={this.onMoveShouldSetResponder}
        >
          <Image
            source={Images.sliderButton}
            style={[styles.tick, this.getTickStyle()]}
          />
        </View>
      </View>
    );
  }
}
