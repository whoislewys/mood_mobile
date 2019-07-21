import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { dimensions } from '../../../assets/styles';

const styles = StyleSheet.create({
  albumContainer: {
    flex: 1,
    elevation: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  albumArtRadiusContainer: {
    // extra container around image to reliably apply borderRadius cross platform
    height: 0.903 * dimensions.width,
    width: 0.903 * dimensions.width,
    borderRadius: 5,
    overflow: 'hidden',
  },
  albumArt: {
    flex: 1,
  },
});

export default class AlbumArtCarouselItem extends Component {
  // TODO: album art microinterction on componentDidMount here
  render = () => {
    return (
      <View style={styles.albumContainer}>
        <View style={styles.albumArtRadiusContainer}>
          <Image
            style={styles.albumArt}
            source={{ uri: this.props.artwork }}
          />
        </View>
      </View>
    );
  }
}
