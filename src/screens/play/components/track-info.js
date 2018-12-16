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
    flex: 10,
    alignItems: 'center',
  },
  albumContainer: {
    backgroundColor: 'red',
  },
  timeBar: {
    width: '100%',
    alignSelf: 'stretch',
    marginTop: '4.2%',
    backgroundColor: 'transparent',
  },
  albumInfo: {
    marginBottom: 27,
  },
});

export default class TrackInfo extends Component {
  render = () => (
      <View style={styles.trackInfoContainer}>
        <View style={styles.albumContainer}>
          <AlbumArt
            url={this.props.track.artwork}
            skipForward={this.props.skipForward}
            skipBack={this.props.skipBack}
          />
        </View>
        <View style={styles.timeBar}>
          <TimeBar setTime={this.props.setTime}/>
        </View>
        <View style={[styles.albumInfo]}>
          <InfoText track={this.props.track} />
        </View>
      </View>
  )
}
