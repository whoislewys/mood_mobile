import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Images from '@assets/images.js';

var Background = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={Images.bgImage} style={styles.bgImage}>
          <Image source={Images.bgOverlay} style={styles.bgImage}>
            { this.props.children }
          </Image>
        </Image>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

export default Background;
