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
  resetPosition: function(e) {
    this.dragging = false;

    this.setState({
      
    })
  },
  render: function() {
    return <Image source={{uri: this.props.url}} style={styles.albumArt} />
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
