import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Player from './src/components/player';

import store from './src/redux/store';

class App extends Component {
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

AppRegistry.registerComponent('mood_mobile', () => App);
