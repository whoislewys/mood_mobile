import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

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

  getTickStyle: function() {
    let style = styles.tick;
    let dragging = {
      width: 3,
      height: 18,
      marginTop: 1
    };

    return (this.state.dragging) ? dragging : style;
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
            backgroundColor: '#eee'
          }
        ]}></View>
        <Image source={Images.timeBarTick}
          onResponderMove={this.setPosition}
          onResponderRelease={this.handleRelease}
          onStartShouldSetResponder={this._onStartShouldSetResponder}
          onMoveShouldSetResponder={this._onMoveShouldSetResponder}
          style={this.getTickStyle()}
        />
        <View style={[
          {
            height: 1,
            width: width - this.state.x,
            marginTop: 10,
            backgroundColor: '#999'
          }
        ]}></View>
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
    flexDirection: 'row'
  },
  tick: {
    width: 2,
    height: 11,
    marginTop: 5
  }
});

export default TimeBar;
