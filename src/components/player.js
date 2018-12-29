import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Navigator from '../navigation/app-navigator';
import { setMood } from '../redux/modules/mood';
import { loadSongsForMoodId } from '../redux/modules/queue';
import { resetScore, stopScoreTimer } from '../redux/modules/score';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repeat: false,
      shuffled: false,
    };

    StatusBar.setBarStyle('light-content', true);
  }

  componentDidMount = () => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

  componentWillUnmount = () => {
    this.props.stopScoreTimer();
  }

  // ///////////////////////////////////////////////////////////
  // State change functions
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
    this.props.resetScore();
    await TrackPlayer.reset();
    await TrackPlayer.add(sharedTrack);
    await TrackPlayer.play();
    await TrackPlayer.pause();
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
      this.props.resetScore();
    } catch (_) {}
  }

  skipToPrevious = async () => {
    try {
      if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      }
      await TrackPlayer.skipToPrevious();
      this.props.resetScore();
    } catch (_) {}
  }

  toggleShuffle = () => {
    this.setState({ shuffled: !this.state.shuffled });
  }

  toggleRepeat = () => {
    this.setState({ repeat: !this.state.repeat });
  }
  // ////////////////////////////////////////////////////////////////////////////

  // Misc. Functions ///////////////////////////////////////////////////////////

  // When I wrote this, only me and God knew the purpose of this function
  // Now, only God knows
  mod = (n, m) => ((n % m) + m) % m

  loadSongsForMood = (id) => {
    TrackPlayer.reset();
    this.props.loadSongsForMoodId(id);
  }

  render = () => {
    let track = this.props.queue.find(e => (e.id === this.props.track));
    if (track === undefined) track = this.props.queue[0]; // This is gross, I promise I'll fix it
    return (
      <Navigator
        screenProps={{
          currentTrack: track,
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
  queue: state.queue.queue,
});

const mapDispatchToProps = {
  setMood,
  loadSongsForMoodId,
  resetScore,
  stopScoreTimer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
