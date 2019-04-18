import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {
  handleDuck,
  handlePlayPress,
  skipToNext,
  skipToPrevious,
  playbackTrack,
  playbackState,
} from './modules/queue';

async function eventHandler(store, data) {
  // Forward remote events to the player
  switch (data.type) {
    // Playback updates
    case 'remote-play':
      store.dispatch(handlePlayPress());
      break;
    case 'remote-pause':
      store.dispatch(handlePlayPress());
      break;
    case 'remote-stop':
      TrackPlayer.stop();
      break;
    case 'remote-next':
      store.dispatch(skipToNext());
      break;
    case 'remote-previous':
      store.dispatch(skipToPrevious());
      break;
    case 'remote-seek':
      TrackPlayer.seekTo(data.position);
      break;
    case 'playback-state':
      store.dispatch(playbackState(data.state));
      break;
    case 'playback-track-changed':
      store.dispatch(playbackTrack(data.nextTrack));
      break;
    case 'playback-error':
      Alert.alert('An error ocurred', data.error);
      break;
    case 'remote-duck':
      store.dispatch(handleDuck(data));
    default:
  }
}

module.exports = function (store) {
  return eventHandler.bind(null, store);
};
