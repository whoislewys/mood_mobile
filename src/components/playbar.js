import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { colors, fonts } from '../assets/styles';
import Images from '../assets/images';
import HeartButton from './score-component-v2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
    backgroundColor: '#fff',
    // careful changing elevation, it interacts with navbar closely
    elevation: 9,
    shadowOpacity: 0.40,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  starContainer: {
    flex: 25,
  },
  detailsContainer: {
    flex: 75,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  songName: {
    fontFamily: fonts.primary,
    fontSize: 15,
    color: colors.header,
  },
  artistName: {
    fontFamily: fonts.primary,
    fontSize: 13,
    color: colors.subHeader,
  },
  playButtonContainer: {
    flex: 25,
    alignItems: 'center',
  },
  playPauseButton: {
    height: 29,
    width: 29,
    resizeMode: 'contain',
  },
});

export default class PlayBar extends Component {
  playButton = () => {
    if (this.props.playbackState === TrackPlayer.STATE_PLAYING) {
      return (
        <View style={styles.playButtonContainer}>
          <TouchableOpacity onPress={this.props.handlePlayPress} activeOpacity={0.6}>
            <Image source={Images.navPauseButton} style={styles.playPauseButton} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={this.props.handlePlayPress} activeOpacity={0.6}>
          <Image source={Images.navPlayButton} style={styles.playPauseButton} />
        </TouchableOpacity>
      </View>
    );
  };

  trackInfo = () => {
    if (this.props.curTrack == null) return <View style={styles.detailsContainer} />;
    const { title, artist } = this.props.curTrack;
    return (
      <View style={styles.detailsContainer}>
        <Text
          style={styles.songName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={styles.artistName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {artist}
        </Text>
      </View>
    );
  };

  render = () => (
    <TouchableOpacity
      testID='PlaybarContainer'
      accessible={false}
      style={styles.container}
      activeOpacity={0.7}
      onPress={this.props.navigateToPlayscreenFromPlaybar}
    >
      <View style={styles.starContainer} testID={'starContainer'}>
        <HeartButton
          extraStyles={{ tintColor: colors.black }}
          navigation={this.props.navigation}
        />
      </View>
      { this.trackInfo() }
      { this.playButton() }
    </TouchableOpacity>
  )
}
