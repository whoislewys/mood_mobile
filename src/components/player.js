import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';

import Navigator from '../navigation/app-navigator';
import { loadSongsForMood, setPlaying } from '../redux/modules/queue';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: 0,
      repeat: false,
      currentTime: 0,
      updateCurrentTime: true,
      playQueue: [],
    };
  }

  render = () => (
      <View>
        <Navigator />
      </View>
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue.queue,
  playing: state.queue.playing,

  loading: state.queue.loading,
  errors: state.queue.loading,
});

const mapDispatchToProps = {
  loadSongsForMood,
  setPlaying,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
