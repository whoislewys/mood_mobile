import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Button
} from 'react-native';

import Background from './background';
import Carousel from './mood-screen-components/carousel';
import Images from '@assets/images';

let Moods = [
  {
    name: 'Alive & Festive',
    bg: Images.aliveBG
  },
  {
    name: 'Bothered & Content',
    bg: Images.botheredBG
  },
  {
    name: 'Broken & Sad',
    bg: Images.brokenBG
  },
  {
    name: 'Excited & Passionate',
    bg: Images.excitedBG
  },
  {
    name: 'Hurt & Moved',
    bg: Images.hurtBG
  },
  {
    name: 'Powerful & Motivated',
    bg: Images.powerfulBG
  },
  {
    name: 'Young & Chill',
    bg: Images.youngBG
  }
]

let MoodScreen = React.createClass({
  getInitialState: function() {
    return {
      mood: 0
    }
  },
  nextMood: function() {
    if(this.state.mood >= Moods.length - 1) {
      this.setState({mood: 0});
    } else {
      this.setState({mood: this.state.mood + 1});
    }
  },
  setMood: function(mood) {
    let index = Moods.indexOf(mood);
    // console.log(index);
    this.setState({mood: index});
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Background image={Moods[this.state.mood].bg} overlay={Images.moodOverlay}>
          <View style={styles.headerContainer}>
            <View style={styles.padding}>

            </View>
            <Image source={Images.moodHeader} style={styles.header} />
            <View style={styles.padding}>

            </View>
          </View>
          <View style={styles.carousel}>
            <Carousel moods={Moods} setMood={this.setMood} navigation={this.props.navigation} setPlayQueue={this.props.setPlayQueue}/>
          </View>
        </Background>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20
  },
  header: {
    flex: 54,
    resizeMode: 'contain'
  },
  padding: {
    flex: 23
  },
  carousel: {
    flex: 93,
    alignItems: 'center'
  }
});

export default MoodScreen;
