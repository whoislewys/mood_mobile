import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    backgroundColor: '#fff',
  },
  shadow: {
    flex: 10,
    padding: 15,
    paddingTop: 35,
    zIndex: 3,

    elevation: 2,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#555',
    shadowOffset: { height: 0, width: 0 },
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    flex: 10,
    textAlign: 'center',
    color: '#111',
    fontSize: 35,
    fontWeight: '200',
    shadowColor: 'white',
  },
  padding: {
    flex: 25,
  },
  moodList: {
    flex: 90,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 2,
    marginRight: 2
  },
  footer: {
    flex: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // borderTopWidth: 2,
    // borderTopColor: '#ddd'
  },
  goArrow: {
    resizeMode: 'stretch',
    height: 20
  }
});

const MoodScreen = React.createClass({
  getInitialState() {
    return {
      mood: -1,
    };
  },
  setMood(index) {
    console.log(index);
    this.setState({ mood: index }, () => {
      this._onGo(index);
    });
  },
  _onGo(index) {
    console.log(index);
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
    if(this.state.mood == -1) {
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
  _getHeader() {
    if(this.state.mood == -1) {
      return <Text style={styles.headerText}>Mood</Text>;
    } else {
      return (
        <ActivityIndicator color={'black'} size={'large'} animating={true} style={{flex: 10}}/>
        // <Icon
        //   name='loading'
        //   color='black'
        //   style={{backgroundColor: 'transparent', alignSelf: 'center'}}
        //   size={35}
        // />
      );
    }
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.padding} />

          <View style={styles.headerContainer}>
            <Icon
              name='account'
              color='black'
              style={{backgroundColor: 'transparent', alignSelf: 'center', flex: 1}}
              size={25}
            />
            { this._getHeader() }
            <Icon
              name='settings'
              color='black'
              style={{backgroundColor: 'transparent', alignSelf: 'center', flex: 1}}
              size={25}
            />
          </View>
          <View style={styles.padding} />

        </View>
        <View style={styles.moodList}>
          <MoodList moods={this.props.moods} moodBgs={Moods} setMood={this.setMood} selected={this.state.mood} />
        </View>
        { this._getMusicBar() }
      </View>
    );
  },
});

export default MoodScreen;
