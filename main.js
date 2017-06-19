import React from 'react';

import _ from 'lodash';
import Sound from 'react-native-sound';
import Sound2 from 'react-native-audio-streamer';
import MusicControl from 'react-native-music-control';

import Navigator from './components/main-components/navigator';

const Main = React.createClass({
  // Lifecycle Functions
  getInitialState() {
    return {
      currentTrack: 0,
      playing: false,
      shuffle: false,
      added: false,
      repeat: false,
      more: false,
      currentTime: 0,
      duration: 0,
      playQueue: [],
    };
  },
  componentWillMount() {
    if (this.state.playQueue.length > 0) {
      this.loadCurrentTrack();
    }
  },

  // Control Functions
  nextTrack() {
    this.cycleSong(1);
  },
  previousTrack() {
    this.cycleSong(-1);
  },
  togglePlaying() {
    this.setState({ playing: !this.state.playing });
  },
  handlePlayPress() {
    if (this.state.playing) {
      this.pausePlayback();
    } else {
      this.startPlayback();
    }
  },
  setTime(seconds) {
    // const track = this.state.playQueue[this.state.currentTrack].soundFile;
    //
    // this.pausePlayback(track);
    // track.setCurrentTime(seconds);
    this.setState({ currentTime: seconds }, () => {
      Sound2.seekToTime(seconds);
    });
    // this.setState({ currentTime: seconds }, () => {
    //   this.startPlayback(track);
    // });
  },
  toggleShuffle() {
    if (this.state.shuffle) {
      this.pausePlayback();
      this.setState({ playing: false, currentTime: 0, currentTrack: 0 });
      this.unShuffle();
    } else {
      this.pausePlayback();
      this.setState({ playing: false, currentTime: 0, currentTrack: 0 });
      this.shuffle();
    }
    this.setState({ shuffle: !this.state.shuffle });
  },
  toggleRepeat() {
    this.setState({ repeat: !this.state.repeat });
  },
  toggleMore() {
    this.setState({ more: !this.state.more });
  },
  toggleAdded() {
    this.setState({ added: !this.state.added });
  },
  setCurrentTime(time) {
    this.setState({ currentTime: time });
  },
  setPlayQueue(queue) {
    this.setState({ playQueue: queue }, () => {
      this.loadCurrentTrack();
    });
  },
  addToPlayQueue(queue) {
    this.setState({ playQueue: this.state.playQueue.concat(queue) });
  },

  // Playback Control
  pausePlayback() {
    const track = this.state.playQueue[this.state.currentTrack].soundFile;

    Sound2.pause();
    clearInterval(this.interval);
    this.setState({ playing: false }, () => {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
    });
  },
  startPlayback() {
    // const track = this.state.playQueue[this.state.currentTrack].soundFile;

    // track.play((success) => {
    //   if (success) {
    //     this.cycleSong(1);
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
    Sound2.play();

    this.interval = setInterval(() => {
      Sound2.currentTime((err, seconds) => {
        // MusicControl.updatePlayback({
        //   elapsedTime: seconds
        // });
        if(this.state.duration == 0) {
          this.getDuration();
        }
        this.setState({ currentTime: seconds });
      });
    }, 200);

    this.setState({ playing: true });

    // const trackInfo = this.props.playQueue[this.state.currentTrack];
    //
    // MusicControl.setNowPlaying({
    //   title: trackInfo.name,
    //   artwork: trackInfo.art_url, // URL or RN's image require()
    //   artist: trackInfo.artist,
    //   album: trackInfo.album_name,
    //   duration: track.getDuration(), // (Seconds)
    //   description: '', // Android Only
    //   color: 0xFFFFFF // Notification Color - Android Only
    // });
  },

  // Other
  unShuffle() {
    // this.setState({ playQueue: null });
  },
  shuffle() {
    this.setState({ playQueue: _.shuffle(this.state.playQueue) });
  },
  cycleSong(direction) {
    const track = this.state.playQueue[this.state.currentTrack].soundFile;
    let nextTrack = this.state.currentTrack + direction;

    this.pausePlayback(track);

    if (this.state.repeat) {
      if (nextTrack >= this.state.playQueue.length) {
        nextTrack = 0;
      } else if (nextTrack < 0) {
        nextTrack = this.state.playQueue.length - 1;
      }
    } else if (nextTrack >= this.state.playQueue.length) {
      this.setState({ currentTrack: 0, currentTime: 0, playing: false });
      return;
    } else if (nextTrack < 0) {
      this.setState({ currentTrack: 0, currentTime: 0, playing: false }, this.loadCurrentTrack);
      return;
    }

    this.setState({
      currentTrack: nextTrack,
      currentTime: 0,
      playing: false }, this.loadCurrentTrack);
  },
  handleTrackChange() {
    this.loadCurrentTrack();
    this.handlePlayPress();
  },
  loadCurrentTrack() {
    Sound2.setUrl(this.state.playQueue[this.state.currentTrack].file);
    this.startPlayback();
    this.getDuration();
    // let tracks = this.state.playQueue;
    // let file = new Sound({uri: tracks[index].file},
    //                     (error, props) => {
    //                       if(error) {
    //                         console.log('Error loading track: ');
    //                       }
    //                     });
    // tracks[index].soundFile = file;
    // this.setState({playQueue: tracks}, () => {
    //   console.log(this.state.playQueue);
    // });
  },
  getDuration() {
    Sound2.duration(
      (error, duration) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`URL: ${this.state.playQueue[this.state.currentTrack].file}`);
          console.log(`Duration: ${duration}`);
          this.setState({ duration });
        }
      },
    );
  },
  // buildFiles: function(listIn) {
  //   let files = [];
  //   const list = (listIn == undefined) ? this.props.list : listIn;
  //
  //   for(var i = 0; i < list.length; i++) {
  //     files[i] = (
  //       new Sound({uri: list[i].file}, (error, props) => {
  //         if(error) {
  //           console.log('Error loading track: ');
  //         }
  //       })
  //     );
  //
  //     console.log('Loaded song: ' + list[i].name);
  //   }
  //
  //   this.setState({files: files});
  // },

  render() {
    return (<Navigator
      // Track info
      currentTrack={this.state.currentTrack}
      playing={this.state.playing}
      currentTime={this.state.currentTime}
      playQueue={this.state.playQueue}
      duration={this.state.duration}

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
      togglePlaying={this.togglePlaying}
      toggleShuffle={this.toggleShuffle}
      toggleRepeat={this.toggleRepeat}
      toggleMore={this.toggleMore}
      toggleAdded={this.toggleAdded}
      setCurrentTime={this.setCurrentTime}
      setPlayQueue={this.setPlayQueue}
      addToPlayQueue={this.addToPlayQueue}
    />);
  },
});

export default Main;
