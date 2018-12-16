import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  albumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation: 4,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  albumArt: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default class AlbumArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
    };
  }

  setPosition = (e) => {
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
    });

    this.drag.x = e.nativeEvent.pageX;
  }

  handleRelease = () => {
    if (this.state.x > 100) {
      this.props.skipBack();
    } else if (this.state.x < -100) {
      this.props.skipForward();
    }
    this.resetPosition();
  }

  resetPosition = () => {
    this.dragging = false;

    this.setState({
      x: 0,
    });
  }

  onStartShouldSetResponder = (e) => {
    this.dragging = true;

    this.drag = {
      x: e.nativeEvent.pageX,
    };

    return true;
  }

  onMoveShouldSetResponder = () => true

  getCardStyle = () => {
    const transform = [{ translateX: this.state.x }];
    return { transform };
  }

  render = () => (
    <View style={styles.albumContainer}>
      <Image
        onResponderMove={this.setPosition}
        onResponderRelease={this.handleRelease}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onMoveShouldSetResponder={this.onMoveShouldSetResponder}
        source={{ uri: this.props.url }}
        style={[styles.albumArt, this.getCardStyle()]}
      />
    </View>
  )
}
