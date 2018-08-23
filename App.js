import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Player from './src/components/player';

import store from './src/redux/store';

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

  // ///////////////////////////////////////////////////////////
  // Queue control functions

  // set the playQueue, adding a 'player' element to each song
  setPlayQueue = (queue) => {
    // const newQueue = queue.map((song) => {
    //   const newSong = song;
    //
    //   newSong.player = new Player(song.file, {
    //     autoDestroy: false,
    //   }).prepare((err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });

    //   return newSong;
    // });

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

  render = () => (
      <Provider store={store}>
        <Player />
      </Provider>
  )
}
