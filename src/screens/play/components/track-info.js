import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import AlbumArt from './album-art';
import InfoText from './info-text';
import TimeBar from './time-bar';
import { dimensions } from '../../../assets/styles';

const styles = StyleSheet.create({
  trackInfoContainer: {
    flex: 69,
    alignItems: 'center',
  },
  timeBar: {
    width: dimensions.width * 0.63,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  albumInfo: {
    marginBottom: 41,
  },
});

export default class TrackInfo extends Component {
  render = () => (
      <View style={styles.trackInfoContainer}>
        <AlbumArt
          url={this.props.track.artwork}
          skipForward={this.props.skipForward}
          skipBack={this.props.skipBack}
        />
        <TimeBar setTime={this.props.setTime}/>
        <View style={[styles.albumInfo]}>
          <InfoText track={this.props.track} />
        </View>
      </View>
  )
}
