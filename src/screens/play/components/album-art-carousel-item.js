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
    alignSelf: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  albumArt: {
    flex: 1,
    // give this image the same height & width so
    // borderRadius will be applied
    height: 0.903 * dimensions.width,
    width: 0.903 * dimensions.width,
    resizeMode: 'contain',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default class AlbumArtCarouselItem extends Component {
  // TODO: album art microinterction on componentDidMount here
  render = () => {
    return (
      <View style={styles.albumContainer}>
        <Image
          style={styles.albumArt}
          source={{ uri: this.props.artwork }}
        />
      </View>
    );
  }
}
