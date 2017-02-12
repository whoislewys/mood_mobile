import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

let AlbumArt = React.createClass({
  getInitialState: function() {
    return {
      x: 0
    }
  },
  setPosition: function(e) {
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x)
    });

    this.drag.x = e.nativeEvent.pageX;
  },
  handleRelease: function(e) {
    if(this.state.x > 100) {
      this.props.skipForward();
    } else if(this.state.x < -100) {
      this.props.skipBack();
    }
    this.resetPosition();
  },
  resetPosition: function(e) {
    this.dragging = false;

    this.setState({
      x: 0
    });
  },
  _onStartShouldSetResponder: function(e) {
    this.dragging = true;

    this.drag = {
      x: e.nativeEvent.pageX
    };

    return true;
  },
  _onMoveShouldSetResponder: function(e) {
    return true;
  },
  getCardStyle: function() {
    var transform = [{translateX: this.state.x}];
    return {transform: transform};
  },
  render: function() {
    return <Image
      onResponderMove={this.setPosition}
      onResponderRelease={this.handleRelease}
      onStartShouldSetResponder={this._onStartShouldSetResponder}
      onMoveShouldSetResponder={this._onMoveShouldSetResponder}
      source={{uri: this.props.url}}
      style={[styles.albumArt, this.getCardStyle()]}
    />
  }
});

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  albumArt: {
    flex: 75,
    width: width - (0.1 * width),
    height: width - (0.1 * width),
    resizeMode: 'contain'
  }
});

export default AlbumArt;
