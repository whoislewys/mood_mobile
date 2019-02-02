import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  albumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default class AlbumArtCarouselItem extends Component {
  render = () => {
    console.log('carousel art: ', this.props.artwork);
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
