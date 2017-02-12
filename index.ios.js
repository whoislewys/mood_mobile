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
import Background from './components/background'

var Mood = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Background>
          <Playscreen />
        </Background>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('moodmobile', () => Mood);
