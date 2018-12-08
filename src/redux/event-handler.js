import { Alert } from 'react-native';

import { playbackState, playbackTrack } from './modules/queue';

async function eventHandler(store, data) {
  switch (data.type) {
    // Playback updates
    case 'playback-state':
      store.dispatch(playbackState(data.state));
      break;
    case 'playback-track-changed':
      store.dispatch(playbackTrack(data.nextTrack));
      break;
    case 'playback-error':
      Alert.alert('An error ocurred', data.error);
      break;
    default:
  }
}

module.exports = function (store) {
  return eventHandler.bind(null, store);
};
