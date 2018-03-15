import React from 'react';
import { DeviceEventEmitter } from 'react-native';

// import store from './components/redux/store.js'
import Navigator from './components/main-components/navigator'

import _ from 'lodash';
import Sound from 'react-native-sound';
import Sound2 from 'react-native-audio-streamer';
import MusicControl from 'react-native-music-control';

export default class Main extends React.Component {
  // Lifecycle Functions
  state = {
    currentTrack: 0,
    playing: false,
    shuffle: false,
    repeat: false,
    currentTime: 0,
    duration: -1,
    playQueue: [],
    oldQueue: [], //Used to hold the unmutated queue
    playStatus: 'STOPPED'
  };

  componentWillMount = () => {
    if (this.state.playQueue.length > 0) {
      this.loadCurrentTrack();
    }
  }

  componentDidMount = () => {
    this.subscription = DeviceEventEmitter.addListener('RNAudioStreamerStatusChanged', this._statusChanged)
    // MusicControl.enableControl('play', true);
    // MusicControl.enableControl('pause', true);
    // MusicControl.enableControl('nextTrack', true);
    // MusicControl.enableControl('previousTrack', true);
    // MusicControl.enableControl('seekForward', false);
    // MusicControl.enableControl('seekBackward', false);
    //
    // MusicControl.enableBackgroundMode(true);
    //
    // MusicControl.on('play', (() => {
    //   if(!this.state.playing) {
    //     this.startPlayback();
    //   }
    // }).bind(this))
    //
    // MusicControl.on('pause', (() => {
    //   if(this.state.playing) {
    //     this.pausePlayback();
    //   }
    // }).bind(this))
    //
    // MusicControl.on('nextTrack', this.nextTrack)
    //
    // MusicControl.on('previousTrack', this.previousTrack)
  }

  // Control Functions
  nextTrack = () => {
    this.cycleSong(1);
  }

  previousTrack = () => {
    this.cycleSong(-1);
  }

  togglePlaying = () => {
    this.setState({ playing: !this.state.playing });
  }

  handlePlayPress = () => {
    if (this.state.playing) {
      this.pausePlayback();
    } else {
      this.startPlayback();
    }
  }

  setTime = (seconds) => {
    this.setState({ currentTime: seconds }, () => {
      Sound2.seekToTime(seconds);
    });
  }

  toggleShuffle = () => {
    if(this.state.shuffle) {
      this.setState({shuffle: false, playQueue: this.state.oldQueue, oldQueue: []});
    } else {
      this.pausePlayback();

      let newState = this.state.playQueue;
      [newState[0], newState[this.state.currentTrack]] = [newState[this.state.currentTrack], newState[0]];

      for (let i = newState.length - 1; i > 1; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newState[i], newState[j]] = [newState[j], newState[i]];
      }

      this.setState({oldQueue: this.state.playQueue, playQueue: newState, shuffle: true, currentTrack: 0}, this.startPlayback);
    }
  }

  toggleRepeat = () => {
    this.setState({repeat: !this.state.repeat})

  }

  setCurrentTime = (time) => {
    this.setState({ currentTime: time });
  }

  setPlayQueue = (queue) => {
    this.setState({ playQueue: queue }, () => {
      this.loadCurrentTrack();
    });
  }

  addToPlayQueue = (queue) => {
    this.setState({ playQueue: this.state.playQueue.concat(queue) });
  }

  // Playback Control
  pausePlayback = () => {
    const track = this.state.playQueue[this.state.currentTrack].soundFile;

    Sound2.pause();
    clearInterval(this.interval);
    this.setState({ playing: false }, () => {
      // MusicControl.updatePlayback({
      //   state: MusicControl.STATE_PAUSED,
      // });
    });
  }

  startPlayback = () => {
    Sound2.play();

    this.interval = setInterval(() => {
      Sound2.currentTime((err, seconds) => {
        // MusicControl.updatePlayback({
        //   elapsedTime: seconds,
        //   duration: this.state.duration
        // });
        if(this.state.duration == -1) {
          this.getDuration();
        }
        this.setState({ currentTime: seconds });
      });
    }, 200);

    this.setState({ playing: true });

    const trackInfo = this.state.playQueue[this.state.currentTrack];

    // MusicControl.setNowPlaying({
    //   title: trackInfo.name,
    //   artwork: trackInfo.art_url, // URL or RN's image require()
    //   artist: trackInfo.artist,
    //   album: trackInfo.album_name,
    //   duration: this.state.duration, // (Seconds)
    //   description: '', // Android Only
    //   color: 0xFFFFFF // Notification Color - Android Only
    // });
  }

  //Other
  cycleSong = (direction) => {
    const track = this.state.playQueue[this.state.currentTrack].soundFile;
    let nextTrack = this.state.currentTrack + direction;

    this.pausePlayback(track);
    if (nextTrack >= this.state.playQueue.length) {
      this.setState({ currentTrack: 0, currentTime: 0, playing: false, duration: -1 });
      return;
    } else if (nextTrack < 0) {
      this.setState({ currentTrack: 0, currentTime: 0, playing: false, duration: -1 }, this.loadCurrentTrack);
      return;
    }

    this.setState({
      currentTrack: nextTrack,
      currentTime: 0,
      playing: false,
      duration: -1 }, this.loadCurrentTrack);
  }

  handleTrackChange = () => {
    this.loadCurrentTrack();
    this.handlePlayPress();
  }

  loadCurrentTrack = () => {
    Sound2.setUrl(this.state.playQueue[this.state.currentTrack].file);
    this.startPlayback();
    this.getDuration();
  }

  getDuration = () => {
    Sound2.duration(
      (error, duration) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(`URL: ${this.state.playQueue[this.state.currentTrack].file}`);
          // console.log(`Duration: ${duration}`);
          if(duration != 0) this.setState({ duration });
        }
      },
    );
  }

  _statusChanged = (playStatus) => {
    if(playStatus == 'FINISHED') this.nextTrack();
    this.setState({playStatus});
  }

  render = () => {
    return (
      <Navigator
        // Track info
        currentTrack={this.state.currentTrack}
        playing={this.state.playing}
        currentTime={this.state.currentTime}
        playQueue={this.state.playQueue}
        duration={this.state.duration}
        liked={this.state.liked}

        // Queue mutations
        shuffle={this.state.shuffle}
        repeat={this.state.repeat}

        // Trash
        added={this.state.added}
        more={this.state.more}

        // Functions
        nextTrack={this.nextTrack}
        previousTrack={this.previousTrack}
        handlePlayPress={this.handlePlayPress}
        setTime={this.setTime}
        toggleShuffle={this.toggleShuffle}
        toggleRepeat={this.toggleRepeat}
        setCurrentTime={this.setCurrentTime}
        setPlayQueue={this.setPlayQueue}
        addToPlayQueue={this.addToPlayQueue}
      />
    );
  }
}
