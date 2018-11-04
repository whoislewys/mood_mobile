import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Player from './src/components/player';
import store from './src/redux/store';

class App extends Component {
  render = () => (
      <Provider store={store}>
        <Player />
      </Provider>
  )
}

AppRegistry.registerComponent('mood_mobile', () => App);
