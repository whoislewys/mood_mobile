import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import firebase from 'react-native-firebase';
import Navigator from '../navigation/app-navigator';
import { userLoggedIn } from '../redux/modules/auth';
import { setMood } from '../redux/modules/mood';
import { stopPlayback } from '../redux/modules/queue';
import { stopScoreTimer } from '../redux/modules/score';

class Player extends Component {
  componentDidMount = async () => {
    const { currentUser } = firebase.auth();
    if (currentUser != null) this.props.userLoggedIn(currentUser);
  };

  componentWillUnmount = () => {
    this.props.stopScoreTimer();
  };

  render = () => (
    <Navigator
      screenProps={{
        playing: this.props.playbackState === TrackPlayer.STATE_PLAYING,
        loading: this.props.loading,
        mood: this.props.selected,
        moodList: this.props.moods,
        stopPlayback: this.props.stopPlayback,
        setTime: TrackPlayer.seekTo,
      }}
    />
  )
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
  stopScoreTimer,
  stopPlayback,
  userLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
