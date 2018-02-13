import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationActions } from 'react-navigation';

import Images from '@assets/images.js';
import PlayControls from './play-screen-components/play-controls';
import TrackInfo from './play-screen-components/track-info';
import Background from './background';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.03,
  },
  menuDropdown: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 0.01 * width,
    marginRight: 0.02 * width,
    marginTop: 20
  },
  moodText: {
    backgroundColor: 'transparent',
    color: 'white',
    justifyContent: 'center',
  },
  backButton: {
    width: 25,
    height: 13,
    marginTop: 8,
    marginLeft: 0.02 * width,
    resizeMode: 'stretch',
  },
});

export default class PlayScreen extends React.Component {
  componentWillMount = () => {
    for (let i = 1; i < this.props.playQueue.length; i += 1) {
      const url = this.props.playQueue[i].art_url;

      const prefetchTask = Image.prefetch(url);
      prefetchTask.then(() => {
        console.log(`✔ Prefetch OK - ${this.props.playQueue[i].album_name}`);
      }, () => {
        console.log(`✘ Prefetch failed - ${this.props.playQueue[i].album_name}`);
      });
    }

    StatusBar.setBarStyle('light-content', true);
  }

  navBack = () => {
    // fetch('http://api.moodindustries.com/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    // // fetch('http://localhost:3000/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    //   .then((responseJson) => {
    //     return responseJson.json();
    //   })
    //   .then((json) => {
    //     let list = Object.keys(json).map(function (key) { return json[key]; });
    //     this.props.navigation.navigate('Mood', {moods: list})
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render = () => {
    return (
      <Background
        image={{ uri: this.props.playQueue[this.props.currentTrack].art_url }}
        blur={50}
      >
        <View style={styles.container}>
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={this.navBack}>
              {/* <Icon
                name='arrow-left'
                color='white'
                style={{backgroundColor: 'transparent'}}
                size={25}
              /> */}
              <Image source={Images.dropdownArrow} style={styles.backButton} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={this.navBack}>
              <Icon
                name='playlist-plus'
                color='white'
                style={{backgroundColor: 'transparent'}}
                size={25}
              />
              <Image source={Images.backArrow} style={styles.backButton} />
            </TouchableOpacity> */}
            {/* <Text style={styles.moodText}>{this.props.mood.name}</Text> */}
          </View>
          <TrackInfo
            skipForward={this.props.nextTrack}
            skipBack={this.props.previousTrack}
            track={this.props.playQueue[this.props.currentTrack]}
            duration={this.props.duration}
            currentTime={this.props.currentTime}
            setTime={this.props.setTime}
          />
          <PlayControls
            shuffle={this.props.shuffle}
            repeat={this.props.repeat}
            toggleShuffle={this.props.toggleShuffle}
            toggleRepeat={this.props.toggleRepeat}

            playing={this.props.playing}
            handlePlayPress={this.props.handlePlayPress}
          />
        </View>
      </Background>
    );
  }
}
