import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Images from '@assets/images.js';
import Background from './background';
import MoodList from './mood-screen-components/mood-list';
import Mood from './mood-screen-components/mood';

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
    name: 'Excited & Passionate',
    bg: Images.excitedBG,
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
  },
  footer: {
    alignItems: 'flex-end',
    paddingRight: 50,
    paddingBottom: 25
  },
  goArrow: {
    resizeMode: 'stretch',
    height: 20
  }
});

const MoodScreen = React.createClass({
  getInitialState() {
    return {
      mood: 0,
    };
  },
  nextMood() {
    if (this.state.mood >= Moods.length - 1) {
      this.setState({ mood: 0 });
    } else {
      this.setState({ mood: this.state.mood + 1 });
    }
  },
  setMood(index) {
    console.log(index);
    this.setState({ mood: index });
  },
  _onGo() {
    fetch('http://api.moodindustries.com/api/v1/songs/?t=EXVbAWTqbGFl7BKuqUQv')
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });
        this.props.setPlayQueue(list);
        this.props.navigation.navigate('Play', {mood: Moods[this.state.mood]})
      })
      .catch((error) => {
        console.log(error);
      });
  },
  render() {
    return (
      <View style={styles.container}>
        <Background image={Moods[this.state.mood].bg} overlay={Images.moodOverlay}>
          <View style={styles.headerContainer}>
            <View style={styles.padding} />
            <Image source={Images.moodHeader} style={styles.header} />
            <View style={styles.padding} />
          </View>
          <View style={styles.moodList}>
            <MoodList moods={Moods} setMood={this.setMood} selected={this.state.mood} />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={this._onGo}>
              <Image source={Images.goArrow} style={styles.goArrow}/>
            </TouchableOpacity>
          </View>
        </Background>
      </View>
    );
  },
});

export default MoodScreen;
