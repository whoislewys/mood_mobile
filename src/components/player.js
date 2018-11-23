import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Navigator from '../navigation/app-navigator';
import { loadSongsForMoodId } from '../redux/modules/queue';
import { setMood } from '../redux/modules/mood';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repeat: false,
      playQueue: [],
      shuffled: false,
    };

    StatusBar.setBarStyle('light-content', true);
  }

  componentDidMount = () => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

  // ///////////////////////////////////////////////////////////
  // State change functions
  handlePlayPress = async () => {
    const { track } = this.props;
    if (track == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(this.props.queue);
      await TrackPlayer.play();
    } else if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  stopPlayback = async () => {
    if (!(this.props.track == null || this.props.playbackState === TrackPlayer.STATE_PAUSED)) {
      await TrackPlayer.pause();
    }
  }

  // setTime = (time) => {
  //   this.state.playQueue[this.state.currentTrack].player.seek(time);
  //   this.setState({ updateCurrentTime: this.state.playing, currentTime: time });
  //   // Only prevent update to current time if the song is currently playing
  // }

  // setPlayQueue = (queue) => {
  //   const newQueue = queue.map((song) => {
  //     const newSong = song;
  //
  //     newSong.player = new Player(song.file, {
  //       autoDestroy: false,
  //     }).prepare((err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     });
  //
  //     return newSong;
  //   });
  //
  //   this.setState({ playQueue: queue });
  // }

  skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  }

  skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  }

  toggleShuffle = () => {
    // if (this.state.shuffle) {
    //   this.setState({ playQueue: this.state.oldQueue, oldQueue: [], shuffle: false });
    // } else {
    //   const shuffled = this.shuffle(this.state.playQueue, this.state.currentTrack);
    //   this.setState({ oldQueue: this.state.playQueue, playQueue: shuffled, shuffle: true });
    // }
    this.setState({ shuffled: !this.state.shuffled });
  }

  toggleRepeat = () => {
    this.setState({ repeat: !this.state.repeat });
  }
  // ////////////////////////////////////////////////////////////////////////////

  // Misc. Functions ///////////////////////////////////////////////////////////

  // When I wrote this, only me and God knew the purpose of this function
  // Now, only God knows
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

  loadSongsForMood = (id) => {
    TrackPlayer.reset();
    this.props.loadSongsForMoodId(id);
  }

  render = () => {
    let track = this.props.queue.find(e => (e.id === this.props.track));
    if (track === undefined) track = this.props.queue[0]; // This is gross, I promise I'll fix it

    return (
      <Navigator
        screenProps={{
          currentTrack: track,
          playing: this.props.playbackState === TrackPlayer.STATE_PLAYING,
          loadSongsForMoodId: this.loadSongsForMood,
          shuffled: this.state.shuffled,
          repeat: this.state.repeat,
          loading: this.props.loading,
          mood: this.props.selected,
          moodList: this.props.moods,
          handlePlayPress: this.handlePlayPress,
          setTime: TrackPlayer.seekTo,
          toggleShuffle: this.toggleShuffle,
          toggleRepeat: this.toggleRepeat,
          nextTrack: TrackPlayer.skipToNext,
          previousTrack: TrackPlayer.skipToPrevious,
          stopPlayback: this.stopPlayback,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  loading: state.queue.loading,
  errors: state.queue.loading,
  playbackState: state.queue.playback,
  track: state.queue.track,
  queue: state.queue.queue,
});

const mapDispatchToProps = {
  loadSongsForMoodId,
  setMood,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
