import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Playscreen from './components/playscreen';
import Images from '@assets/images';

var Mood = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.bgImage}
          style={styles.bgImage}
        >

        </Image>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'green',
    position: 'relative'
  },
  bgImage: {
    resizeMode: 'stretch'
  }
});

AppRegistry.registerComponent('moodmobile', () => Mood);
