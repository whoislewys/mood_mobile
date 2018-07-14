import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { Player } from 'react-native-audio-toolkit';

import store from './src/redux/store';
import Navigator from './src/navigation/app-navigator';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: 0,
      playing: false,
      shuffle: false,
      repeat: false,
      currentTime: 0,
      updateCurrentTime: true,
      playQueue: [],
      oldQueue: [],
      loading: false,
    };
  }

  // Lifecycle functions
  componentDidMount = () => {

  }

  // ///////////////////////////////////////////////////////////
  // Queue control functions

  // set the playQueue, adding a 'player' element to each song
  setPlayQueue = (queue) => {
    const newQueue = queue.map((song) => {
      const newSong = song;

      newSong.player = new Player(song.file, {
        autoDestroy: false,
      }).prepare((err) => {
        if (err) {
          console.log(err);
        }
      });

      return newSong;
    });

    this.setState({ playQueue: queue });
  }

  nextTrack = () => {
    this.cycleSong(1);
  }

  previousTrack = () => {
    this.cycleSong(-1);
  }

  toggleShuffle = () => {
    if (this.state.shuffle) {
      this.setState({ playQueue: this.state.oldQueue, oldQueue: [], shuffle: false });
    } else {
      const shuffled = this.shuffle(this.state.playQueue, this.state.currentTrack);
      this.setState({ oldQueue: this.state.playQueue, playQueue: shuffled, shuffle: true });
    }
  }

  toggleRepeat = () => {
    this.setState({ repeat: !this.state.repeat });
  }

  // Cycle the currentTrack in the direction/amount defined
  cycleSong = (direction) => {
    if (this.state.loading) return;

    const end = this.state.playQueue.length - 1;
    let next = this.state.currentTrack + direction;

    if (this.state.repeat) {
      if (next < 0 || next > end) {
        next = this.mod(next, end + 1);
      }
    } else if (next < 0) {
      next = 0;
    } else if (next > end) {
      next = end;
    }

    this.setNewSong(next);
  }
  // ///////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////
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
    this.setState({ updateCurrentTime: this.state.playing, currentTime: time });
    // Only prevent update to current time if the song is currently playing
  }

  pausePlayback = () => {
    this.state.playQueue[this.state.currentTrack].player.pause(this.playingStopped);
  }

  startPlayback = () => {
    const [player] = this.state.playQueue[this.state.currentTrack];
    if (player.canPlay) {
      player.play(this.playingStarted);
      player.on('ended', this.songEndCallback);
    }
  }

  stopPlayback = () => {
    const track = this.state.playQueue[this.state.currentTrack];
    if (track && track.player && track.player.canStop) {
      track.player.stop(this.playingStopped);
      this.setState({ currentTime: 0 });
    }
  }
  // ///////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////
  // State change functions
  playingStarted = () => {
    this.setState({ playing: true, updateCurrentTime: true });
    this.startInterval();
  }

  playingStopped = () => {
    this.stopInterval();
    this.setState({ playing: false });
  }

  songEndCallback = () => {
    this.stopPlayback();
    this.nextTrack();
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      if (!this.state.playing || !this.state.updateCurrentTime) return;
      const track = this.state.playQueue[this.state.currentTrack];
      this.setState({ currentTime: track.player.currentTime });
    }, 500);
  }

  stopInterval = () => {
    clearInterval(this.interval);
  }

  setNewSong = (index) => {
    if (this.state.playing) {
      this.stopPlayback();
      this.state.playQueue[this.state.currentTrack].player.stop();
    }

    this.setState({ currentTime: 0, currentTrack: index }, this.startPlayback);
  }

  setLoadingInterval = () => {
    if (!this.state.loading) {
      this.setState({
        loading: setInterval(() => {
          const [player] = this.state.playQueue[this.state.currentTrack];

          if (player.canPlay) {
            this.clearLoadingInterval();
          }
        }, 1000),
      });
    }
  }

  clearLoadingInterval = () => {
    if (this.state.loading) {
      clearInterval(this.state.loading);
      this.setState({ loading: false });
    }
  }
  // ///////////////////////////////////////////////////////////

  // ///////////////////////////////////////////////////////////
  // Mood list functions

  // setMood = (mood) => {
  //   this.stopPlayback();
  //   this.setState({ mood }, this.loadMoodSongs.bind(null, func));
  // }

  // loadMoodSongs = (callback) => {
  //   this.setState({ loading: true });
  //   const url = `http://api.moodindustries.com/api/v1/moods/${this.state.moodList[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;
  //   // let url = `http://localhost:3000/api/v1/moods/${this.props.moods[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;
  //
  //   fetch(url)
  //     .then(responseJson => responseJson.json())
  //     .then((json) => {
  //       const list = Object.keys(json).map(key => json[key]);
  //       this.setPlayQueue(list);
  //
  //       const art_url = list[0].art_url;
  //
  //       const prefetchTask = Image.prefetch(art_url);
  //       prefetchTask.then(() => {
  //         console.log(`✔ First Prefetch OK - ${list[0].album_name}`);
  //
  //         this.setState({ loading: false });
  //         callback();
  //       }, () => {
  //         console.log(`✘ Prefetch failed - ${list[0].album_name}`);
  //
  //         this.setState({ loading: false });
  //         callback();
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // ///////////////////////////////////////////////////////////

  // Misc. functions
  mod = (n, m) => ((n % m) + m) % m

  noop = () => {

  }

  shuffle = (arr, curr) => {
    const array = arr.slice();
    const [id] = arr[curr];
    let m = array.length; let t; let
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    const index = array.findIndex(k => k.id === id);
    // array = array.slice(index).concat(array.slice(0, index));
    [array[this.state.currentTrack], array[index]] = [array[index], array[this.state.currentTrack]];

    return array;
  }

  appLoaded = (loaded) => {
    if (loaded) SplashScreen.hide();
    else SplashScreen.show();
  }

  render = () => (
      <Provider store={store}>
        <Navigator
          // Track info
          currentTrack={this.state.currentTrack}
          playing={this.state.playing}
          playQueue={this.state.playQueue}
          currentTime={this.state.currentTime}

          // Queue mutations
          shuffle={this.state.shuffle}
          repeat={this.state.repeat}

          // Mood functions/data (mostly used by mood screen)
          setMoodList={this.setMoodList}
          setMood={this.setMood}
          loading={this.state.loading}
          setLoading={this.setLoadingInterval}

          mood={this.state.mood}
          moodList={this.state.moodList}

          // Functions
          nextTrack={this.nextTrack}
          previousTrack={this.previousTrack}

          handlePlayPress={this.handlePlayPress}
          stopPlayback={this.stopPlayback}

          setTime={this.setTime}

          toggleShuffle={this.toggleShuffle}
          toggleRepeat={this.toggleRepeat}

          setPlayQueue={this.setPlayQueue}

          appLoaded={this.appLoaded}
        />
      </Provider>
  )
}
