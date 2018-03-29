import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Text,
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
    width: 13,
    height: 23,
    position: 'absolute',
    top: -10,
    left: 0.02 * width,
    opacity: 0.8,
    resizeMode: 'stretch',
    transform: [{ rotateY: '180deg' }],
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
              <Image source={Images.goArrow} style={styles.backButton} />
            </TouchableOpacity>

          <Text style={styles.header}>
            {}
          </Text>

            {/* Add centered mood name to give balance to the top bar */}

          </View>
          <TrackInfo
            skipForward={this.props.nextTrack}
            skipBack={this.props.previousTrack}
            track={this.props.playQueue[this.props.currentTrack]}
            setTime={this.props.setTime}
            currentTime={this.props.currentTime}
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
