import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  albumInfoText: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  albumInfoMain: {
    color: 'white',
    maxWidth: width * 0.5,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  albumInfoSubRow: {
    flexDirection: 'row',
  },
  albumInfoSubText: {
    color: '#ddd',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300',
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
            style={[styles.albumInfoSubText, {
              maxWidth: width * 0.45,
            }]}
            numberOfLines={1}
            ellipsizeMode="tail"
            >
            { track.artist }
          </Text>
          <Text style={[styles.albumInfoSubText, {
            marginHorizontal: 2,
          }]}>
          { track.album ? '-' : '' }
          </Text>
          <Text
            style={[styles.albumInfoSubText, {
              maxWidth: width * 0.45,
            }]}
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
