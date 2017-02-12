import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';
import moment from 'moment';

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
    art_url: 'https://i.scdn.co/image/6ecc3b12c7f9560e3729535af77dba6527e0c85c',
    name: 'Sun',
    artist: 'Two Door Cinema Club',
    album_name: 'Beacon',
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
      currentSong: 0
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

      </View>
    </View>
  },
  currentAlbumArt: function() {
    return <Image source={{uri: albums[this.state.currentSong].art_url}} style={styles.albumArt} />
  },
  timeBar: function(totalTime, currentTime) {
    return <View style={styles.timeBar}>
      <Image source={require('./time-bar-back.png')} resizeMode="stretch" style={[
        {
          alignSelf: 'flex-start',
          overflow: 'hidden',
          height: 2,
          width: 100,
          position: 'absolute',
          flex: 20
        }
      ]}></Image>
      <Image source={require('./time-bar-front.png')} resizeMode="stretch" style={[
        {
          alignSelf: 'flex-end',
          overflow: 'hidden',
          height: 2,
          width: 100,
          position: 'absolute',
          flex: 10 //(currentTime / totalTime) * 100
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
    flex: 30
  },
  albumArt: {
    flex: 75,
    width: width - (0.1 * width),
    height: width - (0.1 * width),
    resizeMode: 'contain'
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
  }
});

export default Playscreen;
