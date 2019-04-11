import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import { shuffle, songPlayAnalyticEventFactory } from '../util';
import { startScoreTimer } from './score';
import { logEvent } from './analytics';
import {
  anal,
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_FAIL,
  LOAD_SHARED_SONG_QUEUE,
  LOAD_SHARED_SONG_QUEUE_SUCCESS,
  LOAD_SHARED_SONG_QUEUE_FAIL,
  LOAD_LEADERBOARD_SONG_QUEUE,
  RESET_QUEUE,
  PLAYBACK_STATE,
  PLAYBACK_TRACK,
  MOOD_TYPE,
  LEADERBOARD_TYPE,
  PLAY_SHUFFLED_PLAYLIST,
} from '../constants';

export const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
  curTrack: null,
  curTrackIndex: NaN,
  sharedTrack: null,
  queueType: '',
};

export function loadSongData(list) {
  return shuffle(list.map(t => ({
    id: t.id.toString(),
    url: t.file,
    title: t.name ? t.name : '',
    artist: t.artist ? t.artist : '',
    album: t.album_name ? t.album_name : '',
    artwork: t.art_url ? t.art_url : '',
    mood_id: t.mood_id ? t.mood_id : '',
  })), 'artist');
}

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_QUEUE:
      // used to empty queue before refilling it with songs from somewhere else
      return {
        ...state,
        loading: true,
        queue: [],
        curTrack: null,
        curTrackIndex: NaN,
        track: null,
        queueType: '',
      };
    case LOAD_SONGS:
      return {
        ...state,
        loading: true,
        queue: [],
        curTrack: null,
        curTrackIndex: NaN,
        track: null,
        queueType: '',
      };
    case LOAD_SONGS_SUCCESS:
      let songs = null;
      songs = loadSongData(action.payload.data);
      return {
        ...state,
        loading: false,
        queue: songs,
        curTrack: songs[0],
        curTrackIndex: 0,
        queueType: MOOD_TYPE,
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
        queueType: '',
      };

    // Loading songs for a leaderboard
    case LOAD_LEADERBOARD_SONG_QUEUE:
      const { selectedLeaderboardSongIndex, leaderboardSongs } = action;
      return {
        ...state,
        loading: false,
        queue: leaderboardSongs,
        curTrack: leaderboardSongs[selectedLeaderboardSongIndex],
        curTrackIndex: selectedLeaderboardSongIndex,
        queueType: LEADERBOARD_TYPE,
      };

    // Loading a shared song, with a queue of the same mood right after
    case LOAD_SHARED_SONG_QUEUE:
      return {
        ...state,
        loading: true,
        queue: [],
        sharedTrack: action.sharedTrack,
        curTrack: null,
        curTrackIndex: NaN,
        track: null,
        queueType: '',
      };
    case LOAD_SHARED_SONG_QUEUE_SUCCESS:
      const songs1 = loadSongData(action.payload.data);
      // add the sharedTrack to front of array
      songs1.unshift(state.sharedTrack);
      return {
        ...state,
        loading: false,
        queue: songs1,
        curTrack: songs1[0],
        curTrackIndex: 0,
        queueType: MOOD_TYPE,
      };
    case LOAD_SHARED_SONG_QUEUE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
        queueType: '',
      };

    case PLAY_SHUFFLED_PLAYLIST:
      return {
        ...state,
        loading: false,
        queue: action.songs,
        curTrack: action.songs[0],
        curTrackIndex: 0,
      };

    // Handles the dispatches from TrackPlayer event handlers
    case PLAYBACK_STATE:
      return {
        ...state,
        playback: action.state,
      };
    case PLAYBACK_TRACK:
      return {
        ...state,
        track: action.track,
        curTrack: action.newCurTrack,
        curTrackIndex: action.newCurTrackIndex,
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

export function shufflePlay(songs) {
  const shuffledSongs = shuffle(songs);
  return async (dispatch) => {
    dispatch({ type: RESET_QUEUE });
    await TrackPlayer.reset();
    await TrackPlayer.add(songs);
    await TrackPlayer.play();
    dispatch({
      type: PLAY_SHUFFLED_PLAYLIST,
      songs: shuffledSongs,
    });
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
      const songs = await axios.get(`http://api.moodindustries.com/api/v1/moods/${moodId}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SONGS_SUCCESS, payload: songs });
      // dispatch(startScoreTimer());
    } catch (e) {
      dispatch({ type: LOAD_SONGS_FAIL });
    }
  };
}

// Leaderboard queue action creators
export function loadLeaderboardSongQueue(selectedLeaderboardSongIndex) {
  return async (dispatch, getState) => {
    await TrackPlayer.reset();
    dispatch({ type: RESET_QUEUE });

    const leaderboardSongs = getState().leaderboard.songs;
    dispatch({
      type: LOAD_LEADERBOARD_SONG_QUEUE,
      selectedLeaderboardSongIndex,
      leaderboardSongs,
    });

    const selectedLeaderboardSong = leaderboardSongs[selectedLeaderboardSongIndex];
    // maybe move this into a helper function
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
      const songs = await axios.get(`http://api.moodindustries.com/api/v1/moods/${sharedTrack.mood_id}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SHARED_SONG_QUEUE_SUCCESS, payload: songs });
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
  return (dispatch, getState) => {
    const { queue, queueType } = getState().queue;

    // find new current track
    const newCurTrackIndex = queue.findIndex(findTrack => findTrack.id === track);
    let newCurTrack = queue[newCurTrackIndex];
    if (newCurTrack === undefined) newCurTrack = queue[0];
    dispatch({
      newCurTrack,
      newCurTrackIndex,
      type: PLAYBACK_TRACK,
      track,
    });

    // do not log analytic or start score timer for an empty queue
    if (!queue.length) return;

    dispatch(logEvent(anal.songPlay, songPlayAnalyticEventFactory(anal.songPlay, queueType, newCurTrack)));
    dispatch(startScoreTimer());
  };
}
