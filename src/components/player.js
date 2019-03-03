import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Navigator from '../navigation/app-navigator';
import { setMood } from '../redux/modules/mood';
import {
  stopPlayback,
} from '../redux/modules/queue';
import { stopScoreTimer } from '../redux/modules/score';

class Player extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount = () => {
    this.props.stopScoreTimer();
  }

  render = () => {
    return (
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
  stopScoreTimer,
  stopPlayback,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
