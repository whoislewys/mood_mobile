import React, { Component } from 'react';
import { AppRegistry, Platform, StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import RNUxcam from 'react-native-ux-cam';
import { Provider } from 'react-redux';
import Player from './src/components/player';
import createEventHandler from './src/redux/event-handler';
import store from './src/redux/store';

if (Platform.OS === 'android') {
  // RNUXCam is incomaptible with current dependencies on iOS
  RNUxcam.optIntoSchematicRecordings(); // this initializes rec
  RNUxcam.startWithKey('egfdnzk1wgo5nse'); // api key
}

export default class App extends Component {
  componentDidMount = async () => {
    const capabilitiesList = [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ];

    const state1 = await TrackPlayer.getState();
    await TrackPlayer.setupPlayer({
      // Can set maxCacheSize like this:
      // maxCacheSize: 1024 * 5, // 5 mb
    });

    const state = await TrackPlayer.getState();

    // necessary for setting capabilities
    TrackPlayer.updateOptions({
      // TODO: set up custom background play controls styling, e.g.
      // icon: <album art>
      // docs on that here: https://github.com/react-native-kit/react-native-track-player/wiki/Documentation#player-functions
      capabilities: capabilitiesList,
      compactCapabilities: capabilitiesList,
      notificationCapabilities: capabilitiesList,
    });
  }

    render = () => (
      <Provider store={store}>
        <StatusBar translucent backgroundColor='rgba(0,0,0,0.00)' />
        <Player />
      </Provider>
    )
}

AppRegistry.registerComponent('mood_mobile', () => App);
TrackPlayer.registerEventHandler(createEventHandler(store));
