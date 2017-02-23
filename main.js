import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import _ from 'lodash';

import Playscreen from './components/play-screen';
import Images from '@assets/images';
import Setlists from '@assets/setlists';
import Background from './components/background';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      list: Setlists[0]
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Background>
          <Playscreen list={this.state.list} shuffle={this.shuffleTracks} reset={this.resetTracks}/>
        </Background>
      </View>
    );
  },
  shuffleTracks: function() {
    this.setState({list: _.shuffle(Setlists[0])})
  },
  resetTracks: function() {
    this.setState({list: Setlists[0]});
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
