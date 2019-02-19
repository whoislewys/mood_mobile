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

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
  curTrack: null,
  curTrackIndex: null,
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
    // Loading songs for a specific mood
    case LOAD_SONGS:
      return { ...state, loading: true, queue: [] };
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
      return {
        ...state,
        queue: action.leaderboardSongs,
        curTrack: action.selectedLeaderboardSong,
        curTrackIndex: action.selectedSongIndex,
      };

    // Loading a shared song, with a queue of the same mood right after
    case LOAD_SHARED_SONG_QUEUE:
      return {
        ...state,
        loading: true,
        queue: [],
        sharedTrack: action.sharedTrack,
      };
    case LOAD_SHARED_SONG_QUEUE_SUCCESS:
      console.log('action.payload.data', action.payload.data);
      const songs1 = loadSongData(action.payload.data);
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
      // console.log('playback track queue: ', state.queue);
      const newCurTrackIndex = state.queue.findIndex(findTrack => findTrack.id === action.track);
      let newCurTrack = state.queue[newCurTrackIndex];
      if (newCurTrack === undefined) newCurTrack = state.queue[0];
      return {
        ...state,
        track: action.track,
        // curTrack: newCurTrack,
        // curTrackIndex: newCurTrackIndex,
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
    // console.log(`queue songs handlePlay: ${queue}`);
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
  return async (dispatch, getState) => {
    if (getState().queue.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    }
    await TrackPlayer.skipToNext();
    dispatch(startScoreTimer());
  };
}

export function skipToPrevious() {
  return async (dispatch, getState) => {
    if (getState().queue.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    }
    await TrackPlayer.skipToPrevious();
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
    await dispatch({
      type: LOAD_SONGS,
      payload: {
        request: {
          url: `/moods/${moodId}/songs`,
          params: {
            t: 'EXVbAWTqbGFl7BKuqUQv',
          },
        },
      },
    });
    // play songs for moodid
    dispatch(handlePlayPress());
    dispatch(startScoreTimer());
  };
}

// Leaderboard queue action creators
export function loadLeaderboardSongQueue(selectedLeaderboardSong, selectedSongIndex) {
  return async (dispatch, getState) => {
    if (TrackPlayer.getState() !== TrackPlayer.STATE_STOPPED && TrackPlayer.getState() !== TrackPlayer.STATE_NONE) {
      // TODO: check if this is unnecessary
      await TrackPlayer.stop();
      await TrackPlayer.reset();
    }
    console.log('trackplayer state on LB click: ', await TrackPlayer.getState());
    const leaderboardSongs = getState().leaderboard.songs;
    await dispatch({
      type: LOAD_LEADERBOARD_SONG_QUEUE,
      selectedLeaderboardSong,
      selectedSongIndex,
      leaderboardSongs,
    });
    // queue shuold have songs and a current track right here
    const {
      track,
      queue,
      playback,
      curTrack,
    } = getState().queue;

    // console.log(`queue songs leaderboard: ${queue}`);
    // console.log(`queue curTrack: ${curTrack}`);
    await TrackPlayer.reset();
    await TrackPlayer.add(queue);
    await TrackPlayer.skip(curTrack.id);
    await TrackPlayer.play();
    dispatch(startScoreTimer());
  };
}

// Shared song action creators
export function loadSharedSongQueue(sharedTrack) {
  return async (dispatch) => {
    await dispatch({
      type: LOAD_SHARED_SONG_QUEUE,
      sharedTrack,
      payload: {
        request: {
          url: `/moods/${sharedTrack.mood_id}/songs`,
          params: {
            t: 'EXVbAWTqbGFl7BKuqUQv',
          },
        },
      },
    });
    dispatch(handlePlayPress());
  };
}

export function playSharedSong(sharedTrack) {
  return async (dispatch) => {
    await TrackPlayer.reset();
    dispatch(loadSharedSongQueue(sharedTrack));
    dispatch(startScoreTimer());
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
  console.log('track in PlaybackTrack: ', track);
  return {
    type: PLAYBACK_TRACK,
    track,
  };
}
