import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import PlayControls from './components/play-controls';
// import TrackInfo from './components/track-info';
import Background from '../../components/background';
import Images from '@assets/images';
import AlbumArt from './components/album-art'

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
class PlayScreen extends Component {
  constructor(props) {
    super(props);

    // TODO: implement proper playing. example app is here https://github.com/react-native-kit/react-native-track-player/tree/dev/example
    // other TODO's are symptoms of poor handling of queue data

    // TODO:  init queue to avoid queue not found error. this is hacky. need a better way to expose queue to TrackPlayer
    this.props.queue.queue = [{
      id: 127, name: 'Really Love', artist: 'Dawson bailey', album_name: '', art_url: 'https://i1.sndcdn.com/artworks-000306722370-p33yx5-t500x500.jpg', file: 'https://production-test-songs.s3.amazonaws.com/songs/files/000/000/127/original/song165.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHMBOKA2QJ7MVUIA%2F20181104%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20181104T095814Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=4d437043958864bbc4ba2feaad02e1d5e3b6637e9cf4491a0222404e029f6ece', mood_id: 1,
    }];
    //this.props.loadSongsForMoodId(this.props.selected.id);

    // const state = TrackPlayer.getState();
    // console.log('track player state: ', state);
    // TrackPlayer documentation: https://github.com/react-native-kit/react-native-track-player/wiki/API
    StatusBar.setBarStyle('light-content', true);
  }
  // if (!this.props.playQueue[this.props.currentTrack].player.canPlay) {
  //   this.props.setLoading();
  // }

  componentDidMount = () => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

togglePlayback = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    await TrackPlayer.reset();
    // fill player with tracks
    for (let i = 0; i < this.props.queue.queue.length; i++) {
      const idStr = this.props.queue.queue[i].id.toString();
      const track = {
        id: idStr,
        url: this.props.queue.queue[i].file,
        title: this.props.queue.queue[i].name,
        artist: this.props.queue.queue[i].artist,
        album: this.props.queue.queue[i].album_name,
        artwork: this.props.queue.queue[i].art_url,
      };
      console.log('created track: ', track);
      await TrackPlayer.add(track); // TODO: add songs to queue and TrackPlayer properly
      // TrackPlayer documentation: https://github.com/react-native-kit/react-native-track-player/wiki/API
    } // done adding songs to TrackPlayer
    await TrackPlayer.play();
  } else {
    if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) { // TODO: update with our state. this is example from docs. https://github.com/react-native-kit/react-native-track-player/blob/dev/example/react/screens/PlaylistScreen.js
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
}

  render = () => {
    const { goBack } = this.props.navigation;
    // const mood = this.props.moodList[this.props.selected];
    // TODO: implement player
    return (
      <Background
        image={{ uri: this.props.queue.queue[this.props.currentTrack].art_url }}
        blur={50}
      >
      <View style={styles.container}>
        <View style={styles.menuDropdown}>
          <TouchableOpacity onPress={() => goBack()} style={styles.touchable}>
            <Image source={Images.arrowUpWhite} style={styles.backButton} />
          </TouchableOpacity>

          <Text style={styles.moodText}>
            { this.props.selected.name.toLowerCase() }
          </Text>
        </View>

        <AlbumArt url={ this.props.queue.queue[this.props.currentTrack].art_url }/>

        <PlayControls
          shuffle={this.props.shuffle}
          repeat={this.props.repeat}
          toggleShuffle={this.props.toggleShuffle}
          toggleRepeat={this.props.toggleRepeat}

          playing={this.props.playing}
          handlePlayPress={this.togglePlayback}

          loading={this.props.loading}
        />
      </View>
      </Background>

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
        <AlbumArt url={Images.arrowUpWhite} style={styles.backButton} />
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
const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue,
});

export default connect(mapStateToProps)(PlayScreen);
