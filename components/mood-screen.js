import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
var TimerMixin = require('react-timer-mixin');

import Images from '@assets/images.js';
import Background from './background';
import MoodList from './mood-screen-components/mood-list';
import Mood from './mood-screen-components/mood';
import Playbar from './main-components/playbar';

const Moods = [
  {
    name: 'Alive & Festive',
    bg: Images.aliveBG,
  },
  {
    name: 'Bothered & Content',
    bg: Images.botheredBG,
  },
  {
    name: 'Broken & Sad',
    bg: Images.brokenBG,
  },
  {
    name: 'Hurt & Moved',
    bg: Images.hurtBG,
  },
  {
    name: 'Powerful & Motivated',
    bg: Images.powerfulBG,
  },
  {
    name: 'Relaxed & Happy',
    bg: Images.excitedBG,
  },
  {
    name: 'Young & Chill',
    bg: Images.youngBG,
  },
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },
  header: {
    flex: 54,
    resizeMode: 'contain',
  },
  padding: {
    flex: 23,
  },
  moodList: {
    flex: 90,
    justifyContent: 'center'
  },
  footer: {
    flex: 12,
    backgroundColor: 'black'
  },
  goArrow: {
    resizeMode: 'stretch',
    height: 20
  }
});

const MoodScreen = React.createClass({
  mixins: [TimerMixin],
  getInitialState() {
    return {
      mood: -1,
    };
  },
  nextMood() {
    if (this.state.mood >= this.props.moods.length - 1) {
      this.setState({ mood: 0 });
    } else {
      this.setState({ mood: this.state.mood + 1 });
    }
  },
  setMood(index) {
    this.clearTimeout(this.timeout);

    console.log(index);
    this.setState({ mood: index }, () => {
      this.timeout = this.setTimeout(
        () => { this._onGo(); },
        2000
      );
    });
  },
  _onGo() {
    let url = `http://api.moodindustries.com/api/v1/moods/${this.props.moods[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;
    // let url = `http://localhost:3000/api/v1/moods/${this.props.moods[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;
    console.log(url);
    fetch(url)
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });
        this.props.setPlayQueue(list);
        this.props.navigation.navigate('Play', {mood: this.props.moods[this.state.mood]})
      })
      .catch((error) => {
        console.log(error);
      });
  },
  _playbarGo() {
    this.props.navigation.navigate('Play', {mood: this.props.moods[this.state.mood]})
  },
  _getBG() {
    if(this.state.mood > -1) {
      return Moods[this.state.mood].bg;
    } else {
      return Moods[0].bg;
    }
  },
  _getMusicBar() {
    if(this.props.playQueue.length > 0) {
      return (
        <View style={styles.footer}>
          <Playbar
            track={this.props.playQueue[this.props.currentTrack]}
            handlePlayPress={this.props.handlePlayPress}
            playing={this.props.playing}
            go={this._playbarGo}
          />
        </View>
      );
    }
  },
  render() {
    return (
      <View style={styles.container}>
        <Background image={this._getBG()} overlay={Images.moodOverlay}>
          <View style={styles.headerContainer}>
            <View style={styles.padding} />
            <Image source={Images.moodHeader} style={styles.header} />
            <View style={styles.padding} />
          </View>
          <View style={styles.moodList}>
            <MoodList moods={this.props.moods} setMood={this.setMood} selected={this.state.mood} />
          </View>
          { this._getMusicBar() }
        </Background>
      </View>
    );
  },
});

export default MoodScreen;
