import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Player from './src/components/player';
import store from './src/redux/store';
import createEventHandler from './src/redux/event-handler';

class App extends Component {
  componentDidMount = async () => {
    await TrackPlayer.setupPlayer({
      // Can set maxCacheSize like this:
      // maxCacheSize: 1024 * 5, // 5 mb
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

  render = () => (
      <Provider store={store}>
        <Player />
      </Provider>
  )
}

AppRegistry.registerComponent('mood_mobile', () => App);
TrackPlayer.registerEventHandler(createEventHandler(store));
