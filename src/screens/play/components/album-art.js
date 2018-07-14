import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class AlbumArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0
    }
  }

  setPosition = (e) => {
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x)
    });

    this.drag.x = e.nativeEvent.pageX;
  }

  handleRelease = (e) => {
    if(this.state.x > 100) {
      this.props.skipBack();
    } else if(this.state.x < -100) {
      this.props.skipForward();
    }
    this.resetPosition();
  }

  resetPosition = (e) => {
    this.dragging = false;

    this.setState({
      x: 0
    });
  }

  _onStartShouldSetResponder = (e) => {
    this.dragging = true;

    this.drag = {
      x: e.nativeEvent.pageX
    };

    return true;
  }

  _onMoveShouldSetResponder = (e) => {
    return true;
  }

  getCardStyle = () => {
    var transform = [{translateX: this.state.x}];
    return {transform: transform};
  }

  render = () => {
    return <Image
      onResponderMove={this.setPosition}
      onResponderRelease={this.handleRelease}
      onStartShouldSetResponder={this._onStartShouldSetResponder}
      onMoveShouldSetResponder={this._onMoveShouldSetResponder}
      source={{uri: this.props.url}}
      style={[styles.albumArt, this.getCardStyle()]}
    />
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  albumArt: {
    flex: 75,
    width: width - (0.1 * width),
    height: width - (0.1 * width),
    resizeMode: 'contain'
  }
});
