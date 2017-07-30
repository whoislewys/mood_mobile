import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions
} from 'react-native';

import Images from '@assets/images.js';
import ToggleButton from '../toggle-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  albumArt: {
    resizeMode: 'cover',
    flex: 1,
  },
  art: {
    flex: 24,
    justifyContent: 'flex-start'
  },
  info: {
    flex: 80,
    paddingLeft: 10
  },
  subInfo: {
    flexDirection: 'row',
  },
  controls: {
    flex: 20,
  },
  albumInfoText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  albumInfoSubText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300'
  }
});

export default React.createClass({
  playButton() {
    if (this.props.playing) {
      return (
        <TouchableOpacity onPress={this.props.handlePlayPress}>
          <Icon
            name='pause'
            color='white'
            style={{backgroundColor: 'transparent'}}
            size={35}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.props.handlePlayPress}>
        <Icon
          name='play'
          color='white'
          style={{backgroundColor: 'transparent'}}
          size={35}
        />
      </TouchableOpacity>
    );
  },
  albumArt() {
    return (
      <Image source={{uri: this.props.track.art_url}} style={styles.albumArt}/>
    );
  },
  render() {
    const track = this.props.track;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.art} onPress={this.props.go}>
          {this.albumArt()}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.go} style={styles.info}>
          <View>
            <Text
              style={[styles.albumInfoText, {
                maxWidth: width * 0.45
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { track.name }
            </Text>
          </View>
          <View style={styles.subInfo}>
            <Text
              style={[styles.albumInfoSubText, {
                maxWidth: width * 0.6
              }]}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
              { track.artist }
              &nbsp;-&nbsp;
              { track.album_name }
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.controls}>
          {this.playButton()}
        </View>
      </View>
    );
  },
});
