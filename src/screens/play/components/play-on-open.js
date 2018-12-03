import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';

export default class PlayOnOpen extends Component {
  componentDidMount = () => {
    // only autoplay when not playing & parent is not playbar
    // Might look smoother if no play button animation would showed
    if (!this.props.playing && this.props.parentScreen !== 'Playbar') {
      this.props.playByDefault();
    }
  }

  render = () => (
      <View />
  )
}
