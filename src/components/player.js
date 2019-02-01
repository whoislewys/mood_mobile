import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Navigator from '../navigation/app-navigator';
import { setMood } from '../redux/modules/mood';
import { loadSongsForMoodId, loadSpecificSong } from '../redux/modules/queue';
import { resetScore, stopScoreTimer, sendScoreDelta } from '../redux/modules/score';

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
  handlePlayPress = async () => {
    const { track } = this.props;
    if (track === null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(this.props.queue);
      await TrackPlayer.play();
    } else if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  handleShare = async (sharedTrack) => {
    // plays a shared song
    console.log('shared track: ', sharedTrack);
    await TrackPlayer.reset();
    this.props.loadSpecificSong(sharedTrack);
    console.log('queue after loading specific song: ', this.props.queue);
    await TrackPlayer.add(this.props.queue);
    await TrackPlayer.play();
  }

  stopPlayback = async () => {
    if (!(this.props.track === null || this.props.playbackState === TrackPlayer.STATE_PAUSED)) {
      await TrackPlayer.pause();
    }
  }

  skipToNext = async () => {
    try {
      if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      }
      await TrackPlayer.skipToNext();
      this.props.resetScore(this.props.sendScoreDelta, this.props.curTrack.id);
    } catch (_) {}
  }

  skipToPrevious = async () => {
    try {
      if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      }
      await TrackPlayer.skipToPrevious();
      this.props.resetScore(this.props.sendScoreDelta, this.props.curTrack.id);
    } catch (_) {}
  }

  toggleShuffle = () => {
    this.setState({ shuffled: !this.state.shuffled });
  }

  toggleRepeat = () => {
    this.setState({ repeat: !this.state.repeat });
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
          handlePlayPress: this.handlePlayPress,
          handleShare: this.handleShare,
          setTime: TrackPlayer.seekTo,
          toggleShuffle: this.toggleShuffle,
          toggleRepeat: this.toggleRepeat,
          nextTrack: this.skipToNext,
          previousTrack: this.skipToPrevious,
          stopPlayback: this.stopPlayback,
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
  loadSpecificSong,
  resetScore,
  stopScoreTimer,
  sendScoreDelta,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
