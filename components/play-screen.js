import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';

import moment from 'moment';
import Sound from 'react-native-sound';

import Images from '@assets/images.js';
import PlayControls from './play-screen-components/play-controls';
import TrackInfo from './play-screen-components/track-info';

var Playscreen = React.createClass({
  getInitialState: function() {
    return {
      currentTrack: 0,
      playing: false,
      shuffle: false,
      added: false,
      repeat: false,
      more: false,
      files: [],
      currentTime: 0
    }
  },
  componentWillMount() {
    let files = [];
    const list = this.props.list;

    for(var i = 0; i < list.length; i++) {
      files[i] = (
        new Sound(list[i].file, Sound.MAIN_BUNDLE, ((error, name) => {
          if(error) {
            console.log('Error loading track: ' + name);
          } else {
            console.log('Loaded track: ' + name);
          }
        }).bind(null, null, list[i].name))
      );
    }

    this.setState({files: files});
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.menuDropdown}>
          <Image source={Images.dropdownArrow} style={styles.dropdownButton}></Image>
        </View>
        <TrackInfo
          skipForward={this.cycleSong.bind(null, 1)}
          skipBack={this.cycleSong.bind(null, -1)}
          track={this.props.list[this.state.currentTrack]}
          duration={this.state.files[this.state.currentTrack].getDuration()}
          currentTime={this.state.currentTime}
        />
        <PlayControls
          add={this.state.added}
          toggleAdd={this.toggleAdd}

          shuffle={this.state.shuffle}
          toggleShuffle={this.toggleShuffle}

          repeat={this.state.repeat}
          toggleRepeat={this.toggleRepeat}

          more={this.state.more}
          toggleMore={this.toggleMore}

          playing={this.state.playing}
          handlePlayPress={this.handlePlayButtonPress}
        />
      </View>
    );
  },
  handlePlayButtonPress: function() {
    let track = this.state.files[this.state.currentTrack];

    if(this.state.playing) {
      this.stopPlayback(track);
    } else {
      this.startPlayback(track);
    }
  },

  startPlayback: function(track) {
    track.play((success) => {
      if (success) {
        this.cycleSong(1);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    this.interval = setInterval(() => {
      track.getCurrentTime((seconds) => {
        this.setState({currentTime: seconds});
      });
    }, 200);

    this.setState({playing: true});
  },
  stopPlayback: function(track) {
    track.pause();
    clearInterval(this.interval);
    this.setState({playing: false});
  },
  cycleSong: function(direction) {
    let track = this.state.files[this.state.currentTrack];
    this.stopPlayback(track);
    track.stop();
    let nextTrack = this.state.currentTrack + direction;

    if(nextTrack >= this.props.list.length) {
      nextTrack = 0;
    } else if(nextTrack < 0) {
      nextTrack = this.props.list.length - 1;
    }

    this.setState({currentTrack: nextTrack, currentTime: 0, playing: false}, this.handlePlayButtonPress);
  },

  //Toggle functions
  toggleAdd: function() {
    this.setState({added: !this.state.added});
  },
  toggleShuffle: function() {
    this.setState({shuffle: !this.state.shuffle});
  },
  toggleRepeat: function() {
    this.setState({repeat: !this.state.repeat});
  },
  toggleMore: function() {
    this.setState({more: !this.state.more});
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
  dropdownButton: {
    width: 20,
    height: 10,
    marginTop: 15,
    marginLeft: 15,
    resizeMode: 'stretch'
  }
});

export default Playscreen;
