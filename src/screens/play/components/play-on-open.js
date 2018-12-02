import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';

export default class PlayOnOpen extends Component {
  // handlePlayPress = async () => {
  //   const { track } = this.props;
  //   if (track == null) {
  //     await TrackPlayer.reset();
  //     await TrackPlayer.add(this.props.queue);
  //     await TrackPlayer.play();
  //   } else if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
  //     await TrackPlayer.play();
  //   } else {
  //     await TrackPlayer.pause();
  //   }
  // }

  componentDidMount = () => {
    this.props.playByDefault();
    // TODO: implement playByDefault in Player. Similar to handlleplaypress but no pause.
  }

  render = () => (
      <View />
  )
}
