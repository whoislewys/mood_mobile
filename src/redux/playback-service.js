import TrackPlayer from 'react-native-track-player';
import {
  handleDuck,
  handlePlayPress,
  skipToNext,
  skipToPrevious,
  playbackTrack,
  playbackState,
} from './modules/queue';

export default async function (store) {
  TrackPlayer.addEventListener('remote-play', () => {
    store.dispatch(handlePlayPress());
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    store.dispatch(handlePlayPress());
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    //   TrackPlayer.stop();
  });

  TrackPlayer.addEventListener('remote-next', () => {
    store.dispatch(skipToNext());
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    store.dispatch(skipToPrevious());
  });

  TrackPlayer.addEventListener('remote-seek', () => {
    TrackPlayer.seekTo(data.position);
  });

  TrackPlayer.addEventListener('playback-state', () => {
    store.dispatch(playbackState(state));
  });

  TrackPlayer.addEventListener('playback-track-changed', (data) => {
    store.dispatch(playbackTrack(data.nextTrack));
  });

  TrackPlayer.addEventListener('playback-error', () => {
    Alert.alert('An error ocurred', data.error);
  });

  TrackPlayer.addEventListener('remote-duck', () => {
    store.dispatch(handleDuck(data));
  });
}
