import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import _ from 'lodash';

import Playscreen from './components/play-screen';
import MoodScreen from './components/mood-screen'
import Images from '@assets/images';
import Background from './components/background';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      list: null,
      screen: 'mood'
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        { this.getScreen() }
      </View>
    );
  },
  getScreen: function() {
    let comp = <MoodScreen play={this.play}/>;
    if(this.state.screen == 'play') {
      comp = (
        <Background>
          <Playscreen
            list={this.state.list}
            shuffle={this.shuffleTracks}
            reset={this.resetTracks}
            moodLink={this.moodScreen}
          />
        </Background>
      );
    }

    return comp;
  },
  play: function(list) {
    this.setState({screen: 'play', list: list});
  },
  moodScreen: function() {
    this.setState({screen: 'mood', list: null});
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
