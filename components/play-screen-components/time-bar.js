import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text
} from 'react-native';
import moment from 'moment';

import Images from '@assets/images';
const width = Dimensions.get('window').width * 0.8;

let TimeBar = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      dragging: false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    let x = (this.props.currentTime / this.props.totalTime) * width;
    if(!this.state.dragging) this.setState({x: x});
  },

  getTickBoxStyle: function() {
    return {
      left: this.state.x - 17
    };
  },
  getTickStyle: function() {
    let style = {
      width: 9,
      height: 9,
      top: 15,
      left: 15
    };

    if(this.state.dragging) {
      style = {
        width: 17,
        height: 17,
        top: 11,
        left: 11
      };
    }

    return style;
  },
  getTime: function() {
    let elem = null;

    if(this.state.dragging) {
      elem = (
        <Text style={[styles.time, {
          top: -20,
          left: this.state.x - 12
        }]}>
          { moment(0).seconds(this.pxToSeconds(this.state.x)).format('m:ss') }
        </Text>
      );
    }

    return elem;
  },
  _onStartShouldSetResponder: function(e) {
    this.dragging = true;
    this.setState({dragging: true});

    this.drag = {
      x: e.nativeEvent.pageX
    };

    return true;
  },
  _onMoveShouldSetResponder: function(e) {
    return true;
  },

  setPosition: function(e) {
    let dx = this.state.x + (e.nativeEvent.pageX - this.drag.x);

    if(dx - 1 > 0 && dx < width) {
      this.setState({
        x: this.state.x + (e.nativeEvent.pageX - this.drag.x)
      });

      this.drag.x = e.nativeEvent.pageX;
    }
  },
  handleRelease: function(e) {
    this.setState({dragging: false});
    this.props.setTime(this.pxToSeconds(this.state.x));
  },

  pxToSeconds: function(pixels) {
    return (this.props.totalTime * pixels) / width;
  },

  render: function() {
    return (
      <View style={styles.timeBar}>
        <View style={[
          {
            height: 1,
            width: this.state.x,
            marginTop: 10,
            backgroundColor: '#fff'
          }
        ]}></View>
        { this.getTime() }
        <View style={[
          {
            height: 1,
            width: width - this.state.x,
            marginTop: 10,
            backgroundColor: '#999'
          }
        ]}></View>
        <View
          style={[styles.tickContainer, this.getTickBoxStyle()]}
          onResponderMove={this.setPosition}
          onResponderRelease={this.handleRelease}
          onStartShouldSetResponder={this._onStartShouldSetResponder}
          onMoveShouldSetResponder={this._onMoveShouldSetResponder}>
          <Image source={Images.sliderButton}
            style={[styles.tick, this.getTickStyle()]}
          />
        </View>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  timeBar: {
    flex: 10,
    width: width,
    marginHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row',
    position: 'relative'
  },
  tick: {
    position: 'absolute'
  },
  tickContainer: {
    position: 'absolute',
    top: -9,
    width: 40,
    height: 40
  },
  time: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    position: 'absolute'
  }
});

export default TimeBar;
