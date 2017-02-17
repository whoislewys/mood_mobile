import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Button,
  TouchableHighlight,
  Text
} from 'react-native';
import moment from 'moment';
import Sound from 'react-native-sound';

import Images from '@assets/images.js';
import AlbumArt from './album-art'

let albums = {
  0: {
    art_url: 'https://i.scdn.co/image/5ad2f7e4dbdbc92bf18611bd2c876303ca35800a',
    name: 'Weak',
    artist: 'AJR',
    album_name: 'What Everyone\'s Thinking',
    file: 'weak.mp3'
  },
  1: {
    art_url: 'https://i.scdn.co/image/2f979440bc6c5312cde340592f715e8a40bd7cbd',
    name: 'Payphone',
    artist: 'Maroon 5',
    album_name: 'Overexposed',
    file: 'payphone.mp3'
  },
  2: {
    art_url: 'https://i.scdn.co/image/5497625c6b3f72bcc2a58933352e87aee72c525f',
    name: 'When My Time Comes',
    artist: 'Dawes',
    album_name: 'North Hills',
    file: 'dawes.mp3'
  },
  3: {
    art_url: 'https://i.scdn.co/image/84849272a950691b5aa835de28b0c1965036201a',
    name: 'Ain\'t No Man',
    artist: 'The Avett Brothers',
    album_name: 'True Sadness',
    file: 'avett.mp3'
  },
  4: {
    art_url: 'https://i.scdn.co/image/b24ac33b2cf2eb196c120a09350e03478c09b996',
    name: 'Sadnecessary',
    artist: 'Milky Chance',
    album_name: 'Sadnecessary',
    file: 'sadnecessary.mp3'
  },
  5: {
    art_url: 'https://i.scdn.co/image/d4b8ab3438e93a26db2bc6d0208b900044d9dc17',
    name: 'World At Large',
    artist: 'Modest Mouse',
    album_name: 'Good News For People Who Love Bad News',
    file: 'world.mp3'
  }
}

var Playscreen = React.createClass({
  getInitialState: function() {
    return {
      currentSong: 1,
      currentTime: 0,
      playing: false,
      shuffle: false,
      added: false,
      repeat: false,
      more: false,
      file: null,
      duration: 1
    }
  },
  componentWillMount: function() {

  },
  render: function() {
    return <View style={[styles.container, this.border('red')]}>
      <View style={[styles.menuDropdown, this.border('blue')]}>
        <Image source={Images.dropdownArrow} style={styles.dropdownButton}></Image>
      </View>
      <View style={[styles.albumContainer, this.border('green')]}>
        { this.currentAlbumArt() }
        <View style={[styles.albumInfo]}>
          { this.timeBar(this.state.duration, this.state.currentTime) }
          { this.albumInfo(albums[this.state.currentSong]) }
        </View>
      </View>
      <View style={[styles.playBar, this.border('yellow')]}>
        { this.addButton() }
        { this.shuffleButton() }
        { this.playButton() }
        { this.repeatButton() }
        { this.moreButton() }
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
      <View style={[
        {
          flex: (currentTime / totalTime) * 300,
          height: 1,
          marginTop: 10,
          backgroundColor: '#eee'
        }
      ]}></View>
      <Image source={Images.timeBarTick} style={[
        {
          width: 2,
          height: 11,
          marginTop: 5
        }
      ]}/>
      <View style={[
        {
          flex: 300 - ((currentTime / totalTime) * 300),
          height: 1,
          marginTop: 10,
          backgroundColor: '#999'
        }
      ]}></View>
    </View>
  },
  border: function(color) {
    // return {
    //   borderColor: color,
    //   borderWidth: 2
    // }
    return null;
  },
  addButton: function() {
    let child = this.state.added ? (
      <Image source={Images.addSongSelected} style={styles.subButton} />
    ) : (
      <Image source={Images.addSongUnselected} style={styles.subButton} />
    );

    return <TouchableHighlight onPress={this.toggleAdd} underlayColor={'transparent'}>
      { child }
    </TouchableHighlight>;
  },
  toggleAdd: function() {
    this.setState({added: !this.state.added});
  },
  shuffleButton: function() {
    let child = this.state.shuffle ? (
      <Image source={Images.shuffleButtonSelected} style={styles.subButton} />
    ) : (
      <Image source={Images.shuffleButtonUnselected} style={styles.subButton} />
    );

    return <TouchableHighlight onPress={this.toggleShuffle} underlayColor={'transparent'}>
      { child }
    </TouchableHighlight>;
  },
  toggleShuffle: function() {
    this.setState({shuffle: !this.state.shuffle});
  },
  repeatButton: function() {
    let child = this.state.repeat ? (
      <Image source={Images.repeatButtonSelected} style={styles.subButton} />
    ) : (
      <Image source={Images.repeatButtonUnselected} style={styles.subButton} />
    );

    return <TouchableHighlight onPress={this.toggleRepeat} underlayColor={'transparent'}>
      { child }
    </TouchableHighlight>;
  },
  toggleRepeat: function() {
    this.setState({repeat: !this.state.repeat});
  },
  moreButton: function() {
    let child = this.state.more ? (
      <Image source={Images.moreButtonSelected} style={styles.subButton} />
    ) : (
      <Image source={Images.moreButtonUnselected} style={styles.subButton} />
    );

    return <TouchableHighlight onPress={this.toggleMore} underlayColor={'transparent'}>
      { child }
    </TouchableHighlight>;
  },
  toggleMore: function() {
    this.setState({more: !this.state.more});
  },
  playButton: function() {
    if(!this.state.playing) {
      return <TouchableHighlight onPress={this.play} underlayColor={'transparent'}>
        <Image source={Images.playButton} style={styles.playButton} />
      </TouchableHighlight>
    } else {
      return <TouchableHighlight onPress={this.pause} underlayColor={'transparent'}>
        <Image source={Images.pauseButton} style={styles.playButton} />
      </TouchableHighlight>
    }
  },
  albumInfo: function(album) {
    const width = Dimensions.get('window').width;

    return <View style={styles.albumInfoText}>
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
          -
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
  },
  play: function() {
    if(this.state.file == null) {
      let newFile = new Sound(albums[this.state.currentSong].file, Sound.MAIN_BUNDLE, (error) => {
        if(error) {
          console.log('alas');
        } else {
          this.setState({
            file: newFile,
            duration: newFile.getDuration()
          }, this.startPlaying);
        }
      });
    } else {
      this.startPlaying();
    }
  },
  startPlaying: function() {
    this.state.file.play((success) => {
      if (success) {
        this.cycleSongForward();
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    this.setState({playing: true});

    this.interval = setInterval(() => {
      this.state.file.getCurrentTime((seconds) => {
        this.setState({currentTime: seconds});
      });
    }, 50);
  },
  pause: function() {
    this.state.file.pause();
    clearInterval(this.interval);
    this.setState({playing: false});
    // this.setState({playing: false});
  },
  cycleSongForward: function() {
    if(this.state.file) this.state.file.stop();
    var song = this.state.currentSong + 1;
    if(song > 5) song = 0;
    if(this.state.playing) this.pause();
    this.setState({currentSong: song, currentTime: 0, file: null}, this.play);
  },
  cycleSongBackward: function() {
    if(this.state.file) this.state.file.stop();
    var song = this.state.currentSong - 1;
    if(song < 0) song = 5;
    if(this.state.playing) this.pause();
    this.setState({currentSong: song, currentTime: 0, file: null}, this.play);
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
    flex: 10,
    width: width * 0.8,
    marginHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row'
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
  },
  albumInfoText: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  albumInfoMain: {
    color: '#ddd',
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
  },
  subButton: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  }
});

export default Playscreen;
