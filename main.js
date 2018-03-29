import React from 'react';
import { DeviceEventEmitter, Image } from 'react-native';

// import store from './components/redux/store.js'
import Navigator from './components/main-components/navigator'

import _ from 'lodash';
import {
    Player,
    MediaStates
} from 'react-native-audio-toolkit';

import SplashScreen from 'react-native-splash-screen'

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
    oldQueue: [],
    moodList: [],
    mood: -1,
    loading: false
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
    if(player.canPlay) {
      player.play(this._playingStarted);
      player.on('ended', this._songEndCallback)
    }
  }

  stopPlayback = () => {
    let track = this.state.playQueue[this.state.currentTrack];
    if(track && track.player && track.player.canStop) {
      track.player.stop(this._playingStopped);
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

  _songEndCallback = () => {
    this.stopPlayback();
    this.nextTrack();
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

  /////////////////////////////////////////////////////////////
  // Mood list functions

  _setMoodList = (list, callback) => {
    callback = callback || noop;
    this.setState({moodList: list}, callback);
  }

  _setMood = (mood) => {
    this.stopPlayback();
    this.setState({mood: mood}, this._loadMoodSongs);
  }

  _loadMoodSongs = () => {
    this.setState({loading: true});
    let url = `http://api.moodindustries.com/api/v1/moods/${this.state.moodList[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;
    // let url = `http://localhost:3000/api/v1/moods/${this.props.moods[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;

    fetch(url)
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });
        this.setPlayQueue(list);

        const art_url = list[0].art_url;

        const prefetchTask = Image.prefetch(art_url);
        prefetchTask.then(() => {
          console.log(`✔ First Prefetch OK - ${list[0].album_name}`);
          this.setState({loading: false});
          this.navigateToPlayScreen();
        }, () => {
          console.log(`✘ Prefetch failed - ${list[0].album_name}`);
          this.setState({loading: false});
          this.navigateToPlayScreen();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  // Navigation functions

  navigateToPlayScreen = (params) => {
    // const navigate = NavigationActions.navigate({
    //   routeName: 'Play',
    //   params: { ...params }
    // });
    //
    // this.props.navigation.dispatch(navigate);
  };

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

        //Mood functions/data (mostly used by mood screen)
        setMoodList={this._setMoodList}
        setMood={this._setMood}
        loading={this.loading}

        mood={this.state.mood}
        moodList={this.state.moodList}

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
