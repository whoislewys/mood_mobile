import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import _ from 'lodash';

import Setlists from '@assets/mood_lists';

import Playscreen from './components/play-screen';
import MoodScreen from './components/mood-screen'
import Images from '@assets/images';
import Background from './components/background';
import Splash from './components/splash-screen';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      list: null,
      screen: 'play',
      loadedSongs: false
    }
  },
  componentDidMount: function() {
    if(!this.state.loadedSongs) {
      fetch('http://api.moodindustries.com/api/v1/songs/?t=EXVbAWTqbGFl7BKuqUQv')
        .then((responseJson) => {
          return responseJson.json();
        })
        .then((json) => {
          let list = Object.keys(json).map(function (key) { return json[key]; });
          this.setState({list: list, loadedSongs: true}, () => console.log(this.state.list));
        })
        .catch((error) => {
          console.log(error);
        });
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
    if(!this.state.loadedSongs) {
      comp = (
        <Splash />
      )
    } else if(this.state.screen == 'play') {
      comp = (
          <Playscreen
            list={this.state.list}
            shuffle={this.shuffleTracks}
            reset={this.resetTracks}
            moodLink={this.moodScreen}
          />
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
