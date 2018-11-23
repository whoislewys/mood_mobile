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
    height: 44,
    width,
    backgroundColor: '#666666',
  },
  arrow: {
    resizeMode: 'contain',
    marginLeft: 15,
    width: 20,
    height: 10,
    opacity: 0.8,
    justifyContent: 'flex-start',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 100,
  },
  songInfo: {
    width: 300,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300',
    textAlign: 'center',
    paddingLeft: 17,
    paddingRight: 20,
  },
  songArtist: {
    color: '#bfbfbf',
  },
  playPauseButton: {
    marginRight: 17,
    width: 28,
    height: 28,
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

  arrowUp = () => (
      <Image source={Images.arrowUpWhite} style={styles.arrow}/>
  );

  render = () => (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.playscreen}>
          {this.arrowUp()}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.playscreen} style={styles.info}>
            <Text
              style= {styles.songInfo}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { this.props.track.title }
              <Text style={styles.songArtist}>
                { ' - ' + this.props.track.artist }
              </Text>
            </Text>
        </TouchableOpacity>
        <View style={styles.controls}>
          {this.playButton()}
        </View>
      </View>
  )
}
