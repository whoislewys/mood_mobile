import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { fonts } from '../../../assets/styles';

const styles = StyleSheet.create({
  trackInfoContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songNameContainer: {
    alignItems: 'center',
  },
  songName: {
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  artistName: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontFamily: fonts.primary,
    fontSize: fonts.body,
  },
});

export default class InfoText extends Component {
  render = () => {
    const { track } = this.props;

    return (
      <View style={styles.trackInfoContainer}>
        <View style={styles.songNameContainer}>
          <Text
            style={styles.songName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            { track.title }
          </Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text
            style={styles.artistName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            { track.artist }
          </Text>
        </View>
      </View>
    );
  }
}
