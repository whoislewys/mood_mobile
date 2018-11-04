import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';

import Images from '@assets/images';
import PlayControls from './components/play-controls';
import TrackInfo from './components/track-info';
import Background from '../../components/background';

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
    justifyContent: 'center',
    marginLeft: 0.01 * width,
    marginRight: 0.02 * width,
    marginTop: 20,
  },
  moodText: {
    flex: 1,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#ccc',

    paddingTop: 0,
    marginTop: -4,

    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: '300',
  },
  backButton: {
    width: 23,
    height: 14,
    position: 'absolute',
    top: -7,
    left: 0.02 * width,
    opacity: 0.5,
    resizeMode: 'stretch',
    transform: [{ rotateX: '180deg' }],
  },
  touchable: {
    zIndex: 2,
  },
});

// TODO: fix this!
// this.props.mood does not exist
// this.props.currentTrack does not exist
// these missing props are what causes this playscreen to throw errors when it gets navigated to
export default class PlayScreen extends Component {
  componentDidMount = () => {
    // Prefetch album art in parallel
    const imagePrefetch = [];
    for (const song of this.props.playQueue) {
      imagePrefetch.push(Image.prefetch(song.art_url));
    }
    Promise.all(imagePrefetch).then(() => {
      console.log('All album art prefetched in parallel');
    });
    // StatusBar.setBarStyle('light-content', true);
    // if (!this.props.playQueue[this.props.currentTrack].player.canPlay) {
    //   this.props.setLoading();
    // }
  }

  render = () => {
    const { goBack } = this.props.navigation;

    const mood = this.props.moodList[this.props.mood];

    return (
      <Text>{mood.name}</Text>
    );
  }
}

/*
// old return
<Background
  image={{ uri: this.props.playQueue[this.props.currentTrack].art_url }}
  blur={50}
>
  <View style={styles.container}>
    <View style={styles.menuDropdown}>
      <TouchableOpacity onPress={() => goBack()} style={styles.touchable}>
        <Image source={Images.arrowUpWhite} style={styles.backButton} />
      </TouchableOpacity>

      <Text style={styles.moodText}>
        { mood.name.toLowerCase() }
      </Text>

      {// Add centered mood name to give balance to the top bar }

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

      loading={this.props.loading}
    />
  </View>
</Background>
*/
