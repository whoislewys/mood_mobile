import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import moment from 'moment';
import Sound from 'react-native-sound';

import Images from '@assets/images.js';
import PlayControls from './play-screen-components/play-controls';
import TrackInfo from './play-screen-components/track-info';
import Background from './background';
import Splash from './splash-screen';

var Playscreen = React.createClass({
  getInitialState: function() {
    return {
      currentTrack: 0,
      playing: false,
      shuffle: false,
      added: false,
      repeat: false,
      more: false,
      currentTime: 0,
      files: []
    }
  },
  componentWillMount: function() {
    this.buildFiles(this.props.list);

    for(var i = 0; i < this.props.list.length; i++) {
      let url = this.props.list[i].art_url;

      let prefetchTask = Image.prefetch(url);

      prefetchTask.then(() => {
                  // console.log(`✔ Prefetch OK (+${new Date() - mountTime}ms) - ${url}`);
                }, error => {
                  console.log(`✘ Prefetch failed - ${this.props.list[i].album_name}`);
                });
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.buildFiles(nextProps.list);
  },
  render: function() {
    return (
      <Background image={{uri: this.props.list[this.state.currentTrack].art_url}}>
        <View style={styles.container}>
          <View style={styles.menuDropdown}>
            <TouchableHighlight>
              <Image source={Images.dropdownArrow} style={styles.dropdownButton}></Image>
            </TouchableHighlight>
          </View>
          <TrackInfo
            skipForward={() => { this.cycleSong(1) }}
            skipBack={() => { this.cycleSong(-1) }}
            track={this.props.list[this.state.currentTrack]}
            duration={this.state.files[this.state.currentTrack].getDuration()}
            currentTime={this.state.currentTime}
            setTime={this.setTime}
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
      </Background>
    );
  },
  handlePlayButtonPress: function() {
    let track = this.state.files[this.state.currentTrack];

    if(this.state.playing) {
      this.pausePlayback(track);
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
  pausePlayback: function(track) {
    track.pause();
    clearInterval(this.interval);
    this.setState({playing: false});
  },
  stopPlayback: function(track) {
    this.pausePlayback(track);
    track.stop();
  },
  setTime: function(seconds) {
    let track = this.state.files[this.state.currentTrack];

    this.pausePlayback(track);
    track.setCurrentTime(seconds);
    this.setState({currentTime: seconds}, () => {
      this.startPlayback(track)
    });
  },
  cycleSong: function(direction) {
    let track = this.state.files[this.state.currentTrack];
    let nextTrack = this.state.currentTrack + direction;

    this.stopPlayback(track);

    if(this.state.repeat) {
      if(nextTrack >= this.props.list.length) {
        nextTrack = 0;
      } else if(nextTrack < 0) {
        nextTrack = this.props.list.length - 1;
      }
    } else {
      if(nextTrack >= this.props.list.length) {
        this.setState({currentTrack: 0, currentTime: 0, playing: false});
        return;
      } else if(nextTrack < 0) {
        this.setState({currentTrack: 0, currentTime: 0, playing: false}, this.handlePlayButtonPress);
        return;
      }
    }

    this.setState({currentTrack: nextTrack, currentTime: 0, playing: false}, this.handlePlayButtonPress);
  },

  buildFiles: function(listIn) {
    let files = [];
    const list = (listIn == undefined) ? this.props.list : listIn;

    for(var i = 0; i < list.length; i++) {
      files[i] = (
        new Sound({uri: list[i].file}, (error, props) => {
          if(error) {
            console.log('Error loading track: ');
          }
        })
      );

      console.log('Loaded song: ' + list[i].name);
    }

    this.setState({files: files});
  },
  //Toggle functions
  toggleAdd: function() {
    this.setState({added: !this.state.added});
  },
  toggleShuffle: function() {
    if(this.state.shuffle) {
      this.stopPlayback(this.state.files[this.state.currentTrack]);
      this.setState({playing: false, currentTime: 0, currentTrack: 0});
      this.props.reset();
    } else {
      this.stopPlayback(this.state.files[this.state.currentTrack]);
      this.setState({playing: false, currentTime: 0, currentTrack: 0});
      this.props.shuffle();
    }

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
    marginLeft: 0.02 * width,
    resizeMode: 'stretch'
  }
});

export default Playscreen;
