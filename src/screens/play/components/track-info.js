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
  render = () => (
      <View style={styles.albumContainer}>
        <AlbumArt
          url={this.props.track.artwork}
          skipForward={this.props.skipForward}
          skipBack={this.props.skipBack}
        />
        <View style={[styles.albumInfo]}>
          <TimeBar
            setTime={this.props.setTime}
          />
          <InfoText track={this.props.track} />
        </View>
      </View>
  )
}
