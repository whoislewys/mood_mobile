// import { Image } from 'react-native';
import shuffle from '../util';

const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
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
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true, queue: [] };
    case LOAD_SONGS_SUCCESS:
      let songs = null;
      songs = loadSongData(action.payload.data);
      return { ...state, loading: false, queue: songs };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };
    case PLAYBACK_STATE:
      return {
        ...state,
        playback: action.state,
      };
    case PLAYBACK_TRACK:
      return {
        ...state,
        track: action.track,
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
