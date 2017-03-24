import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import Background from './background';
import Images from '@assets/images';

var Splash = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={Images.splashScreen} style={styles.bgImage}>
        </Image>
      </View>
    )
  }
});

let styles = StyleSheet.create({
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

export default Splash;
