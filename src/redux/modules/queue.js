// import { Image } from 'react-native';
import shuffle from '../util';

const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const UPDATE_CURRENT_TRACK = 'queue/UPDATE_CURRENT_TRACK';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  currentTrack: {},
  errors: null,
  queue: [],
  playback: null,
  track: null,
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
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true, queue: [] };
    case LOAD_SONGS_SUCCESS:
      // load songs for mood, reset global score to 0, and set current track
      let songs = null;
      songs = loadSongData(action.payload.data);

      // Calculate current track
      let track = songs.find(e => (e.id === state.track));
      if (track === undefined) track = songs[0]; // This is gross, I promise I'll fix it

      return {
        ...state,
        loading: false,
        queue: songs,
        currentTrack: track,
        currentScore: 0,
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };
    case UPDATE_CURRENT_TRACK:
      let newTrack = state.queue.find(e => (e.id === state.track));
      if (newTrack === undefined) newTrack = state.queue[0]; // This is gross, I promise I'll fix it
      return { ...state, currentTrack: newTrack };
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

export function updateCurrentTrack() {
  return {
    type: UPDATE_CURRENT_TRACK,
  };
}
