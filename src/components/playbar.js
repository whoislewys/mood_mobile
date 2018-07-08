import React, { Component } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  albumArt: {
    resizeMode: 'cover',
    flex: 1,
  },
  arrow: {
    resizeMode: 'contain',
    flex: 1,
    marginLeft: 24,
    width: 22,
    height: 11,
    opacity: 0.8,
  },
  art: {
    flex: 20,
    justifyContent: 'flex-start'
  },
  info: {
    flex: 88,
  },
  subInfo: {
    flexDirection: 'row',
  },
  controls: {
    flex: 20,
  },
  albumInfoText: {
    flexDirection: 'row',
    paddingLeft: width * 0.02,
    width: 280,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '300',
    textAlign: 'center'
  },
  albumInfoSubText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300'
  },
  playPauseButton: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent'
  }
});

export default class PlayBar extends Component {
  playButton = () => {
    if (this.props.playing) {
      return (
        <TouchableOpacity onPress={this.props.handlePlayPress}>
          <Image source={Images.pauseButtonWhite} style={styles.playPauseButton} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.props.handlePlayPress}>
        <Image source={Images.playButtonWhite} style={styles.playPauseButton} />
      </TouchableOpacity>
    );
  }

  albumArt = () => {
    return (
      <Image source={Images.arrowUpWhite} style={styles.arrow}/>
    );
  }

  render = () => {
    const track = this.props.track;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.art} onPress={this.props.go}>
          {this.albumArt()}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.go} style={styles.info}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text
              style={[styles.albumInfoText, {
                maxWidth: width * 0.61,
                textAlign: 'center'
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { track.name }
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.controls}>
          {this.playButton()}
        </View>
      </View>
    );
  }
}
