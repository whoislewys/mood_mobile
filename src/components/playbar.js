import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';

import Images from '@assets/images';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#222222',
  },
  albumArt: {
    resizeMode: 'cover',
    flex: 1,
  },
  arrow: {
    flex: 1,
    marginLeft: 24,
    width: 22,
    height: 11,
    opacity: 0.8,
  },
  art: {
    flex: 20,
    justifyContent: 'flex-start',
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
    textAlign: 'center',
  },
  albumInfoSubText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300',
  },
  playPauseButton: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
});

export default class Playbar extends Component {
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

  albumArt = () => (
      <Image source={Images.arrowUpWhite} style={styles.arrow}/>
  );

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.art} onPress={this.props.playscreen}>
          {this.albumArt()}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.playscreen} style={styles.info}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
              style={[styles.albumInfoText, {
                maxWidth: width * 0.61,
                textAlign: 'center',
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { this.props.track.title }
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
