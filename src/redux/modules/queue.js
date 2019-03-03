import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import shuffle from '../util';
import { startScoreTimer } from './score';
// Loading songs for a specific mood
const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const LOAD_SHARED_SONG_QUEUE = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD';
const LOAD_SHARED_SONG_QUEUE_SUCCESS = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_SUCCESS';
const LOAD_SHARED_SONG_QUEUE_FAIL = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_FAIL';

const LOAD_LEADERBOARD_SONG_QUEUE = 'queue/LOAD_LEADERBOARD_SONG_QUEUE';

const RESET_QUEUE = 'queue/RESET_QUEUE';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
  curTrack: null,
  sharedTrack: null,
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
    case RESET_QUEUE:
      // used to empty queue before refilling it with songs from somewhere else
      return {
        ...state,
        loading: true,
        queue: [],
        curTrack: null,
        track: null,
      };

    case LOAD_SONGS:
      return {
        ...state,
        loading: true,
        queue: [],
        curTrack: null,
        track: null,
      };

    case LOAD_SONGS_SUCCESS:
      let songs = null;
      songs = loadSongData(action.payload.data);
      return {
        ...state,
        loading: false,
        queue: songs,
        curTrack: songs[0],
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };

    // Loading songs for a leaderboard
    case LOAD_LEADERBOARD_SONG_QUEUE:
      const { selectedLeaderboardSong, leaderboardSongs } = action;
      return {
        ...state,
        loading: false,
        queue: leaderboardSongs,
        curTrack: selectedLeaderboardSong,
      };

    // Loading a shared song, with a queue of the same mood right after
    case LOAD_SHARED_SONG_QUEUE:
      return {
        ...state,
        loading: true,
        queue: [],
        sharedTrack: action.sharedTrack,
        curTrack: null,
        track: null,
      };
    case LOAD_SHARED_SONG_QUEUE_SUCCESS:
      let songs1 = loadSongData(action.payload.data);
      // add the sharedTrack to front of array
      songs1.unshift(state.sharedTrack);
      return {
        ...state,
        loading: false,
        queue: songs1,
        curTrack: songs1[0],
      };
    case LOAD_SHARED_SONG_QUEUE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };

    // Handles the dispatches from TrackPlayer event handlers
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

/* Action Creators */
// TrackPlayer controls
export function handlePlayPress() {
  return async (dispatch, getState) => {
    const { track, queue, playback } = getState().queue;
    console.log('track on playpress: ', track);
    if (track === null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(queue);
      await TrackPlayer.play();
    } else if (playback === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
}

export function skipToNext() {
  return async (dispatch) => {
    try {
      // works, but should be optimized for skipping several tracks back to back
      // will probably just have to fanagle trackplayer state
      // maybe make this just increment the index and do a trackPlayer.skip(index)
      await TrackPlayer.skipToNext();
    } catch (_) {}
    dispatch(startScoreTimer());
  };
}

export function skipToPrevious() {
  return async (dispatch) => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
    dispatch(startScoreTimer());
  };
}

export function stopPlayback() {
  return async (dispatch, getState) => {
    if (!(getState().queue.track === null || getState().queue.playbackState === TrackPlayer.STATE_PAUSED)) {
      await TrackPlayer.pause();
    }
  };
}

// Mood action creator
export function loadSongsForMoodId(moodId) {
  return async (dispatch) => {
    await TrackPlayer.reset();
    dispatch({ type: LOAD_SONGS });
    try {
      let songs = await axios.get(`http://api.moodindustries.com/api/v1/moods/${moodId}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SONGS_SUCCESS, payload: songs });
      dispatch(startScoreTimer());
    } catch (e) {
      dispatch({ type: LOAD_SONGS_FAIL });
    }
  };
}

// Leaderboard queue action creators
export function loadLeaderboardSongQueue(selectedLeaderboardSong) {
  return async (dispatch, getState) => {
    await TrackPlayer.reset();
    dispatch({ type: RESET_QUEUE });

    const leaderboardSongs = getState().leaderboard.songs;
    dispatch({
      type: LOAD_LEADERBOARD_SONG_QUEUE,
      selectedLeaderboardSong,
      leaderboardSongs,
    });
    await TrackPlayer.add(leaderboardSongs);
    await TrackPlayer.skip(selectedLeaderboardSong.id);
    await TrackPlayer.play();
    dispatch(startScoreTimer());
  };
}

// Shared song action creators
export function loadSharedSongQueue(sharedTrack) {
  return async (dispatch) => {
    await TrackPlayer.reset();
    dispatch({ type: LOAD_SHARED_SONG_QUEUE, sharedTrack });
    try {
      let songs = await axios.get(`http://api.moodindustries.com/api/v1/moods/${sharedTrack.mood_id}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SONGS_SUCCESS, payload: songs });
      dispatch(startScoreTimer());
    } catch (e) {
      dispatch({ type: LOAD_SHARED_SONG_QUEUE_FAIL });
    }
  };
}

// TrackPlayer event action creators
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
