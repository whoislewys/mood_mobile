import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigator from '../navigation/app-navigator';
import { loadSongsForMood } from '../redux/modules/queue';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: 0,
      repeat: false,
      currentTime: 0,
      updateCurrentTime: true,
      playQueue: [],
      shuffled: false,
      playing: false,
    };
  }

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
  // ////////////////////////////////////////////////////////////////////////////

  // Misc. Functions ///////////////////////////////////////////////////////////
  // I don't know why I had to create this one, but I'm sure it's necessary
  mod = (n, m) => ((n % m) + m) % m

  // Shuffle the playqueue, maintaining the selected track, and return new arr
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

  render = () => (
    <Navigator
      screenProps={ {
        currentTrack: this.state.currentTrack,
        playing: this.props.playing,
        playQueue: this.state.playQueue,
        currentTime: this.state.currentTime,
        shuffled: this.state.shuffled,
        repeat: this.state.repeat,
        loading: this.props.loading,
        mood: this.props.selected,
        moodList: this.props.moods,
        nextTrack: this.nextTrack,
        previousTrack: this.previousTrack,
        handlePlayPress: this.handlePlayPress,
        stopPlayback: this.stopPlayback,
        setTime: this.setTime,
        toggleShuffle: this.toggleShuffle,
        toggleRepeat: this.toggleRepeats,
      }
    }
    />
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue.queue,

  loading: state.queue.loading,
  errors: state.queue.loading,
});

const mapDispatchToProps = {
  loadSongsForMood,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
