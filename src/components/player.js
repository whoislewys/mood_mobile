import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Navigator from '../navigation/app-navigator';
import { setMood } from '../redux/modules/mood';
import {
  loadSongsForMoodId,
  loadSharedSongQueue,
  handlePlayPress,
  skipToNext,
  skipToPrevious,
  stopPlayback,
} from '../redux/modules/queue';
import { startScoreTimer, stopScoreTimer, sendScoreDelta } from '../redux/modules/score';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repeat: false,
      shuffled: false,
    };

    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount = () => {
    this.props.stopScoreTimer();
  }

  // Todo clean up this logic w redux-thunk?
  // handlePlayPress = async () => {
  //   const { track } = this.props;
  //   if (track === null) {
  //     await TrackPlayer.reset();
  //     await TrackPlayer.add(this.props.queue);
  //     await TrackPlayer.play();
  //   } else if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
  //     await TrackPlayer.play();
  //   } else {
  //     await TrackPlayer.pause();
  //   }
  // }

  playSharedSong = async (sharedTrack) => {
    // plays a shared song
    console.log('shared track: ', sharedTrack);
    await TrackPlayer.reset();
    this.props.loadSharedSongQueue(sharedTrack);
    console.log('queue after loading specific song: ', this.props.queue);
    await TrackPlayer.add(this.props.queue);
    await TrackPlayer.play();
  }

  loadSongsForMood = (id) => {
    TrackPlayer.reset();
    this.props.loadSongsForMoodId(id);
  }

  render = () => {
    return (
      <Navigator
        screenProps={{
          playing: this.props.playbackState === TrackPlayer.STATE_PLAYING,
          loadSongsForMoodId: this.loadSongsForMood,
          shuffled: this.state.shuffled,
          repeat: this.state.repeat,
          loading: this.props.loading,
          mood: this.props.selected,
          moodList: this.props.moods,
          handlePlayPress: this.props.handlePlayPress,
          nextTrack: this.props.skipToNext,
          previousTrack: this.props.skipToPrevious,
          stopPlayback: this.props.stopPlayback,
          playSharedSong: this.playSharedSong,
          setTime: TrackPlayer.seekTo,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  loading: state.queue.loading,
  errors: state.queue.loading,
  playbackState: state.queue.playback,
  track: state.queue.track,
  curTrack: state.queue.curTrack,
  queue: state.queue.queue,
});

const mapDispatchToProps = {
  setMood,
  loadSongsForMoodId,
  loadSharedSongQueue,
  startScoreTimer,
  stopScoreTimer,
  sendScoreDelta,
  handlePlayPress,
  skipToNext,
  skipToPrevious,
  stopPlayback,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
