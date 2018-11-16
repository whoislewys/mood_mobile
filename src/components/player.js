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
      currentTrack: 0,
      repeat: false,
      currentTime: 0,
      updateCurrentTime: true,
      playQueue: [],
      shuffled: false,
      playing: false,
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
    const currentTrack = this.props.track;
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(this.props.queue);
      await TrackPlayer.play();
    } else if (this.props.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  setTime = (time) => {
    this.state.playQueue[this.state.currentTrack].player.seek(time);
    this.setState({ updateCurrentTime: this.state.playing, currentTime: time });
    // Only prevent update to current time if the song is currently playing
  }

  pausePlayback = () => {

  }

  startPlayback = () => {

  }

  stopPlayback = () => {

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
        loadSongsForMoodId: this.props.loadSongsForMoodId,
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
