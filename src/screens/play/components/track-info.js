import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import AlbumArt from './album-art';
import InfoText from './info-text';
import TimeBar from './time-bar';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  albumContainer: {
    flex: 120,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeBar: {
    flex: 10,
    width: width * 0.8,
    marginHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row',
  },
  albumInfo: {
    flex: 22,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export default class TrackInfo extends Component {
  render = () => {
    // TODO: Rather than divide the props by 1000,
    //       update the TimeBar component to handle milliseconds
    // const player = this.props.track.player;
    let duration = 180;

    // if (player.duration >= 0) {
    //   duration = player.duration / 1000;
    // }

    return (
      <View style={styles.albumContainer}>
        <AlbumArt
          url={this.props.track.art_url}
          skipForward={this.props.skipForward}
          skipBack={this.props.skipBack}
        />
        <View style={[styles.albumInfo]}>
          <TimeBar
            currentTime={this.props.currentTime / 1000}
            totalTime={duration}
            setTime={this.props.setTime}
          />
          <InfoText track={this.props.track} />
        </View>
      </View>
    );
  }
}
