import React from 'react';
import { DeviceEventEmitter } from 'react-native';

// import store from './components/redux/store.js'
import Navigator from './components/main-components/navigator'

import _ from 'lodash';
import {
    Player,
    MediaStates
} from 'react-native-audio-toolkit';

import SplashScreen from 'react-native-splash-screen'

// import Sound from 'react-native-sound';
// import Sound2 from 'react-native-audio-streamer';
// import MusicControl from 'react-native-music-control';

export default class Main extends React.Component {
  // Lifecycle Functions
  state = {
    currentTrack: 0,
    playing: false,
    shuffle: false,
    repeat: false,
    currentTime: 0,
    updateCurrentTime: true,
    playQueue: [],
    oldQueue: []
  };

  // Lifecycle functions
  componentWillMount = () => {

  }

  componentDidMount = () => {

  }

  /////////////////////////////////////////////////////////////
  // Queue control functions

  // set the playQueue, adding a 'player' element to each song
  setPlayQueue = (queue) => {
    let newQueue = queue.map((song, i) => {
      let newSong = song;

      newSong.player = new Player(song['file'], {
        autoDestroy: false
      }).prepare((err) => {
        if (err) {
          console.log(err);
        }
      });

      return newSong;
    });

    this.setState({playQueue: queue});
  }

  nextTrack = () => {
    this.cycleSong(1);
  }

  previousTrack = () => {
    this.cycleSong(-1);
  }

  toggleShuffle = () => {
    if(this.state.shuffle) {
      this.setState({playQueue: this.state.oldQueue, oldQueue: [], shuffle: false});
    } else {
      let a = this.state.playQueue;
      [a[this.state.currentTrack], a[0]] = [a[0], a[this.state.currentTrack]];
      let shuffled = this.shuffle(a);

      this.setState({oldQueue: this.state.playQueue, playQueue: shuffled, shuffle: true});
    }

    console.log(this.state.playQueue);
  }

  toggleRepeat = () => {
    this.setState({repeat: !this.state.repeat})
  }

  // Cycle the currentTrack in the direction/amount defined
  cycleSong = (direction) => {
    let end = this.state.playQueue.length - 1;
    let next = this.state.currentTrack + direction;

    if(this.state.repeat) {
      if(next < 0 || next > end) {
        next = this.mod(next, end + 1);
      }
    } else {
      if(next < 0 ) {
        next = 0;
      } else if(next > end) {
        next = end;
      }
    }

    this.setNewSong(next);

    console.log("Current: " + this.state.currentTrack);
    console.log("Direction: " + direction);
    console.log("New: " + next + "\n\n");
  }
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  // Playback functions
  handlePlayPress = () => {
    if (this.state.playing) {
      this.pausePlayback();
    } else {
      this.startPlayback();
    }
  }

  setTime = (time) => {
    this.state.playQueue[this.state.currentTrack].player.seek(time);
    this.setState({updateCurrentTime: this.state.playing, currentTime: time});
    //Only prevent update to current time if the song is currently playing
  }

  pausePlayback = () => {
    this.state.playQueue[this.state.currentTrack].player.pause(this._playingStopped);
  }

  startPlayback = () => {
    let player = this.state.playQueue[this.state.currentTrack].player;
    if(player.canPlay) player.play(this._playingStarted);
  }

  stopPlayback = () => {
    let player = this.state.playQueue[this.state.currentTrack].player;
    if(player.canStop) {
      player.stop(this._playingStopped);
      this.setState({currentTime: 0});
    }
  }
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  // State change functions
  _playingStarted = () => {
    this.setState({playing: true, updateCurrentTime: true});
    this._startInterval();

    console.log("Playing!");
  }

  _playingStopped = () => {
    this._stopInterval();
    this.setState({playing: false});
    console.log("Paused");
  }

  _startInterval = () => {
    this.interval = setInterval(() => {
      if (!this.state.playing || !this.state.updateCurrentTime) return;
      let track = this.state.playQueue[this.state.currentTrack];
      this.setState({currentTime: track.player.currentTime});
    }, 500);
  }

  _stopInterval = () => {
    clearInterval(this.interval);
  }

  setNewSong = (index) => {
    if(this.state.playing) {
      this.stopPlayback();
      this.state.playQueue[this.state.currentTrack].player.stop();
    }

    this.setState({currentTime: 0, currentTrack: index}, this.startPlayback);
  }
  /////////////////////////////////////////////////////////////

  //Misc. functions
  mod = (n, m) => {
    return ((n % m) + m) % m;
  }

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  appLoaded = () => {
    SplashScreen.hide();
  }

  // shuffle = (arr) => {
  //   let a = arr;
  //   let j, x, i;
  //
  //   for (i = a.length - 1; i > 0; i--) {
  //       j = Math.floor(Math.random() * (i + 1));
  //       [a[i], a[j]] = [a[j], a[i]];
  //   }
  //
  //   return a;
  // }

  render = () => {
    return (
      <Navigator
        // Track info
        currentTrack={this.state.currentTrack}
        playing={this.state.playing}
        playQueue={this.state.playQueue}
        currentTime={this.state.currentTime}

        // Queue mutations
        shuffle={this.state.shuffle}
        repeat={this.state.repeat}

        // Functions
        nextTrack={this.nextTrack}
        previousTrack={this.previousTrack}

        handlePlayPress={this.handlePlayPress}

        setTime={this.setTime}

        toggleShuffle={this.toggleShuffle}
        toggleRepeat={this.toggleRepeat}

        setPlayQueue={this.setPlayQueue}

        appLoaded={this.appLoaded}
      />
    );
  }
}
