import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { dimensions } from '../../../assets/styles';

const styles = StyleSheet.create({
  albumContainer: {
    alignSelf: 'center',
    elevation: 4,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  albumArt: {
    height: 0.902 * dimensions.width,
    width: 0.902 * dimensions.width,
    borderRadius: 4,
  },
});

export default class AlbumArtCarouselItem extends Component {
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
