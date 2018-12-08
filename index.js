import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Player from './src/components/player';
import store from './src/redux/store';
import createEventHandler from './src/redux/event-handler';

class App extends Component {
  render = () => (
      <Provider store={store}>
        <Player />
      </Provider>
  )
}

AppRegistry.registerComponent('mood_mobile', () => App);
TrackPlayer.registerEventHandler(createEventHandler(store));
