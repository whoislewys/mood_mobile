import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions
} from 'react-native';

import Images from '@assets/images.js';
import ToggleButton from '../toggle-button';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  playButton: {
    width: 45,
    height: 45,
  },
  albumArt: {
    resizeMode: 'cover',
    flex: 1,
  },
  art: {
    flex: 24,
    justifyContent: 'flex-start'
  },
  info: {
    flex: 80,
    paddingLeft: 10
  },
  subInfo: {
    flexDirection: 'row',
  },
  controls: {
    flex: 20,
  },
  albumInfoText: {
    color: '#ddd',
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  albumInfoSubText: {
    color: '#ddd',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300'
  }
});

export default React.createClass({
  playButton() {
    if (this.props.playing) {
      return (
        <TouchableOpacity onPress={this.props.handlePlayPress}>
          <Image source={Images.pauseButtonNoRing} style={styles.playButton} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.props.handlePlayPress}>
        <Image source={Images.playButtonNoRing} style={styles.playButton} />
      </TouchableOpacity>
    );
  },
  albumArt() {
    return (
      <Image source={{uri: this.props.track.art_url}} style={styles.albumArt}/>
    );
  },
  render() {
    const track = this.props.track;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.art} onPress={this.props.go}>
          {this.albumArt()}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.go} style={styles.info}>
          <View>
            <Text
              style={[styles.albumInfoText, {
                maxWidth: width * 0.45
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { track.name }
            </Text>
          </View>
          <View style={styles.subInfo}>
            <Text
              style={[styles.albumInfoSubText, {
                maxWidth: width * 0.3
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { track.artist }
            </Text>
            <Text style={[styles.albumInfoSubText, {
              marginHorizontal: 2
            }]}>
              -
            </Text>
            <Text
              style={[styles.albumInfoSubText, {
                maxWidth: width * 0.3
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { track.album_name }
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.controls}>
          {this.playButton()}
        </View>
      </View>
    );
  },
});
