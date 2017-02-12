import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Button,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';

import AlbumArt from './album-art'

var albums = {
  0: {
    art_url: 'https://i.scdn.co/image/5ad2f7e4dbdbc92bf18611bd2c876303ca35800a',
    name: 'Weak',
    artist: 'AJR',
    album_name: 'What Everyone\'s Thinking',
    totalTime: 93000,
    currentTime: 60000
  },
  1: {
    art_url: 'https://i.scdn.co/image/2f979440bc6c5312cde340592f715e8a40bd7cbd',
    name: 'Payphone',
    artist: 'Maroon 5',
    album_name: 'Overexposed',
    totalTime: 93000,
    currentTime: 60000
  },
  2: {
    art_url: 'https://i.scdn.co/image/5497625c6b3f72bcc2a58933352e87aee72c525f',
    name: 'When My Time Comes',
    artist: 'Dawes',
    album_name: 'North Hills',
    totalTime: 93000,
    currentTime: 60000
  },
  3: {
    art_url: 'https://i.scdn.co/image/84849272a950691b5aa835de28b0c1965036201a',
    name: 'Ain\'t No Man',
    artist: 'The Avett Brothers',
    album_name: 'True Sadness',
    totalTime: 93000,
    currentTime: 60000
  }
}

var Playscreen = React.createClass({
  getInitialState: function() {
    return {
      currentSong: 1,
      playing: false
    }
  },
  render: function() {
    return <View style={[styles.container, this.border('red')]}>
      <View style={[styles.menuDropdown, this.border('blue')]}>
        <Image source={require('./dropdown-arrow.png')} style={styles.dropdownButton}></Image>
      </View>
      <View style={[styles.albumContainer, this.border('green')]}>
        { this.currentAlbumArt() }
        <View style={[styles.albumInfo]}>
          { this.timeBar(albums[this.state.currentSong].totalTime, albums[this.state.currentSong].currentTime) }
        </View>
      </View>
      <View style={[styles.playBar, this.border('yellow')]}>
        { this.playButton() }
      </View>
    </View>
  },
  currentAlbumArt: function() {
    return (
      <AlbumArt
        url={albums[this.state.currentSong].art_url}
        skipForward={this.cycleSongForward}
        skipBack={this.cycleSongBackward}
      />);
  },
  timeBar: function(totalTime, currentTime) {
    return <View style={styles.timeBar}>
      <Image source={require('./time-bar-back.png')} resizeMode="stretch" style={[
        {
          alignSelf: 'flex-start',
          height: 1,
          width: 200,
          top: 10,
          position: 'absolute',
          flex: 100 - ((currentTime / totalTime) * 100)
        }
      ]}></Image>
      <Image source={require('./time-bar-tick.png')} style={[
        {
          width: 2,
          height: 11,
          left: 200,
          top: 5,
          position: 'absolute'
        }
      ]}/>
      <Image source={require('./time-bar-front.png')} resizeMode="stretch" style={[
        {
          alignSelf: 'flex-end',
          height: 1,
          top: 10,
          position: 'absolute',
          flex: (currentTime / totalTime) * 100
        }
      ]}></Image>
  </View>
  },
  border: function(color) {
    // return {
    //   borderColor: color,
    //   borderWidth: 2
    // }
    return null;
  },
  playButton() {
    if(this.state.playing) {
      return <TouchableHighlight onPress={this.play} underlayColor={'transparent'}>
        <Image source={require('./play-button.png')} style={styles.playButton} />
      </TouchableHighlight>
    } else {
      return <TouchableHighlight onPress={this.play} underlayColor={'transparent'}>
        <Image source={require('./pause-button.png')} style={styles.playButton} />
      </TouchableHighlight>
    }
  },
  play() {
    this.setState({playing: !this.state.playing});
  },
  cycleSongForward: function() {
    if(this.state.currentSong < 3) {
      this.setState({currentSong: this.state.currentSong + 1});
    } else {
      this.setState({currentSong: 0});
    }
  },
  cycleSongBackward: function() {
    if(this.state.currentSong > 0) {
      this.setState({currentSong: this.state.currentSong - 1});
    } else {
      this.setState({currentSong: 3});
    }
  }
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.03
  },
  menuDropdown: {
    flex: 11
  },
  albumContainer: {
    flex: 120,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  playBar: {
    flex: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  albumInfo: {
    flex: 22,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  timeBar: {
    flex: 1,
    width: width * 0.8,
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  dropdownButton: {
    width: 20,
    height: 10,
    marginTop: 15,
    marginLeft: 15,
    resizeMode: 'stretch'
  },
  playButton: {
    width: 75,
    height: 75
  },
  skipButton: {
    flex: 1
  }
});

export default Playscreen;
