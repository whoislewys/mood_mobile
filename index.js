/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Player from './src/components/player';
import store from './src/redux/store';
import createEventHandler from './src/redux/event-handler';

class App extends Component {
    componentDidMount = async () => {
        console.log('booty');
        await TrackPlayer.setupPlayer({
            // Can set maxCacheSize like this:
            // maxCacheSize: 1024 * 5, // 5 mb
        });
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            // TODO: set up custom background play controls styling, e.g.
            // icon: <album art>
            // docs on that here: https://github.com/react-native-kit/react-native-track-player/wiki/Documentation#player-functions
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
