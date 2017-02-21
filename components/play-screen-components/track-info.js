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
          { this.timeBar(this.props.duration, this.props.currentTime) }
          { this.albumInfo(this.props.track) }
        </View>
      </View>
    );
  },
  albumInfo: function(album) {
    const width = Dimensions.get('window').width;

    return <View style={styles.albumInfoText}>
      <Text
        style={styles.albumInfoMain}
        numberOfLines={1}
        ellipsizeMode="tail"
        >
        { album.name }
      </Text>
      <View style={styles.albumInfoSubRow}>
        <Text
          style={[styles.albumInfoSubText, {
            maxWidth: width * 0.45
          }]}
          numberOfLines={1}
          ellipsizeMode="tail"
          >
          { album.artist }
        </Text>
        <Text style={[styles.albumInfoSubText, {
          marginHorizontal: 2
        }]}>
          -
        </Text>
        <Text
          style={[styles.albumInfoSubText, {
            maxWidth: width * 0.45
          }]}
          numberOfLines={1}
          ellipsizeMode="tail"
          >
          { album.album_name }
        </Text>
      </View>
    </View>
  },
  timeBar: function(totalTime, currentTime) {
    return <View style={styles.timeBar}>
      <View style={[
        {
          flex: (currentTime / totalTime) * 300,
          height: 1,
          marginTop: 10,
          backgroundColor: '#eee'
        }
      ]}></View>
      <Image source={Images.timeBarTick} style={[
        {
          width: 2,
          height: 11,
          marginTop: 5
        }
      ]}/>
      <View style={[
        {
          flex: 300 - ((currentTime / totalTime) * 300),
          height: 1,
          marginTop: 10,
          backgroundColor: '#999'
        }
      ]}></View>
    </View>
  }
});

const width = Dimensions.get('window').width;

let styles = StyleSheet.create({
  albumInfoText: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  albumInfoMain: {
    color: '#ddd',
    maxWidth: width * 0.5,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  albumInfoSubRow: {
    flexDirection: 'row'
  },
  albumInfoSubText: {
    color: '#ddd',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300'
  },
  albumInfo: {
    flex: 22,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
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
});

export default TrackInfo;
