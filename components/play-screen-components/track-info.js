import React from 'react';
import {
  Component,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text
} from 'react-native';

import AlbumArt from './album-art.js';
import Images from '@assets/images.js';
import InfoText from './info-text';
import TimeBar from './time-bar';

var TrackInfo = React.createClass({
  render: function() {
    return (
      <View style={styles.albumContainer}>
        <AlbumArt
          url={this.props.track.art_url}
          skipForward={this.props.skipForward}
          skipBack={this.props.skipBack}
        />
        <View style={[styles.albumInfo]}>
          <TimeBar currentTime={this.props.currentTime} totalTime={this.props.duration} />
          <InfoText track={this.props.track} />
        </View>
      </View>
    );
  }
});

const width = Dimensions.get('window').width;

let styles = StyleSheet.create({
  albumContainer: {
    flex: 120,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  timeBar: {
    flex: 10,
    width: width * 0.8,
    marginHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row'
  },
  albumInfo: {
    flex: 22,
    alignSelf: 'stretch',
    alignItems: 'center'
  }
});

export default TrackInfo;
