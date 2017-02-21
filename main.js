import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Playscreen from './components/play-screen';
import Images from '@assets/images';
import Setlists from '@assets/setlists';
import Background from './components/background';

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Background>
          <Playscreen list={Setlists[0]}/>
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
