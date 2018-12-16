import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { fonts, dimensions } from '../../../assets/styles';

const styles = StyleSheet.create({
  albumInfoText: {
    marginTop: '10.8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  albumInfoMain: {
    color: '#FFFFFF',
    maxWidth: dimensions.width * 0.5,
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
  },
  albumInfoSubRow: {
    flexDirection: 'row',
  },
  albumInfoSubText: {
    color: 'rgba(255, 255, 255, 0.87)',
    marginTop: '3.6%',
    fontFamily: fonts.primary,
    fontSize: fonts.body,
    maxWidth: dimensions.width * 0.45,
  },
});

export default class InfoText extends Component {
  render = () => {
    const { track } = this.props;

    return (
      <View style={styles.albumInfoText}>
        <Text
          style={styles.albumInfoMain}
          numberOfLines={1}
          ellipsizeMode="tail"
          >
          { track.title }
        </Text>
        <View style={styles.albumInfoSubRow}>
          <Text
            style={styles.albumInfoSubText}
            numberOfLines={1}
            ellipsizeMode="tail"
            >
            { track.artist }
          </Text>
          <Text style={styles.albumInfoSubText}>
          { track.album ? '-' : '' }
          </Text>
          <Text
            style={styles.albumInfoSubText}
            numberOfLines={1}
            ellipsizeMode="tail"
            >
            { track.album }
          </Text>
        </View>
      </View>
    );
  }
}
