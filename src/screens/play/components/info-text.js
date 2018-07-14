import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;

let styles = StyleSheet.create({
  albumInfoText: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  albumInfoMain: {
    color: 'white',
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
  }
});

export default class InfoText extends Component {
  render = () => {
    let album = this.props.track;

    return (
      <View style={styles.albumInfoText}>
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
          { album.album_name ? '-' : '' }
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
    );
  }
}
