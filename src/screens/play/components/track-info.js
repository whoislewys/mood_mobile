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
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  albumContainer: {
    height: 0.902 * dimensions.width,
    width: 0.902 * dimensions.width,
    resizeMode: 'stretch',
  },
  timeBar: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  infoText: {
    flex: 1,
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
        <TimeBar setTime={this.props.setTime}/>
        <View style={styles.infoText}>
          <InfoText track={this.props.track} />
        </View>
      </View>
  )
}
