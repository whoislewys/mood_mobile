// import { Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import shuffle from '../util';

const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const LOAD_SPECIFIC_SONG = 'queue/LOAD_SPECIFIC_SONG';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
  curTrack: null,
  currentScore: 0,
};

export function loadSongData(list) {
  return shuffle(list.map(t => ({
    id: t.id.toString(),
    url: t.file,
    title: t.name,
    artist: t.artist,
    album: t.album_name,
    artwork: t.art_url,
    mood_id: t.mood_id,
  })), 'artist');
}

export default function reducer(state = initialState, action = {}) {
  console.log('queue reducer action type: ', action.type);
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true, queue: [] };
    case LOAD_SONGS_SUCCESS:
      // load songs for mood, reset global score to 0, and set current track
      let songs = null;
      songs = loadSongData(action.payload.data);
      return {
        ...state,
        loading: false,
        queue: songs,
        curTrack: songs[0],
        currentScore: 0,
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };

    case LOAD_SPECIFIC_SONG:
      const { specificSong } = action;
      console.log('shared song in reducer: ', specificSong);
      return { ...state, queue: [specificSong], curTrack: [specificSong] };

    case PLAYBACK_STATE:
      return {
        ...state,
        playback: action.state,
      };
    case PLAYBACK_TRACK:
      let newCurTrack = state.queue.find(findTrack => findTrack.id === action.track);
      if (newCurTrack === undefined) newCurTrack = state.queue[0];
      return {
        ...state,
        track: action.track,
        curTrack: newCurTrack,
      };
    default:
      return state;
  }
}

export function loadSongsForMoodId(moodId) {
  return {
    type: LOAD_SONGS,
    payload: {
      request: {
        url: `/moods/${moodId}/songs`,
        params: {
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
      },
    },
  };
}

export function playbackState(state) {
  return {
    type: PLAYBACK_STATE,
    state,
  };
}

export function playbackTrack(track) {
  return {
    type: PLAYBACK_TRACK,
    track,
  };
}

export function loadSpecificSong(specificSong) {
  console.log('specific song in action creatro:', specificSong);
  return {
    type: LOAD_SPECIFIC_SONG,
    specificSong,
  };
}

export function updatePlayback() {
  // should only used when coming back from lock screen
  console.log('calling updateplayback');
  return async () => {
    try {
      playbackState(await TrackPlayer.getState());
      playbackTrack(await TrackPlayer.getCurrentTrack());
    } catch (e) {
      // player not yet initialized, don't update anything
    }
  };
}
