import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import { Platform } from 'react-native';
import { mapSongsToValidTrackObjects, shuffle, songPlayAnalyticEventFactory } from '../util';
import { startScoreTimer } from './score';
import { logEvent } from './analytics';
import {
  anal,
  LEADERBOARD_TYPE,
  LOAD_QUEUE_STARTING_AT_ID,
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_FAIL,
  LOAD_SHARED_SONG_QUEUE,
  LOAD_SHARED_SONG_QUEUE_SUCCESS,
  LOAD_SHARED_SONG_QUEUE_FAIL,
  MOOD_TYPE,
  PLAY_SHUFFLED_PLAYLIST,
  PLAYBACK_STATE,
  PLAYBACK_TRACK,
  RESET_QUEUE,
  SET_CUR_TRACK,
} from '../constants';

export const initialState = {
  curTrack: null,
  curTrackIndex: NaN,
  errors: null,
  loading: false,
  playback: null,
  sharedTrack: null,
  track: null,
  queue: [],
  queueType: '',
};

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
      let moodSongs = null;
      moodSongs = shuffle(mapSongsToValidTrackObjects(action.payload.data));
      return {
        ...state,
        loading: false,
        queue: moodSongs,
        curTrack: moodSongs[0],
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

    case LOAD_QUEUE_STARTING_AT_ID:
      const { startSongIndex, songs } = action;
      return {
        ...state,
        loading: false,
        queue: songs,
        curTrack: songs[startSongIndex],
        curTrackIndex: startSongIndex,
        queueType: '',
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
      const songs1 = shuffle(mapSongsToValidTrackObjects(action.payload.data));
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

    // Reducers for TrackPlayer event handler's dispatches
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

    // used along with updateCurrentTrack middleware to prevent desync issues between TrackPlayer and store
    case SET_CUR_TRACK:
      return {
        ...state,
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
    // try curtrack here instead of track too
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
      const songs = await axios.get(`https://api.moodindustries.com/api/v1/moods/${moodId}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SONGS_SUCCESS, payload: songs });
      dispatch(handlePlayPress());
      dispatch(startScoreTimer());
    } catch (e) {
      dispatch({ type: LOAD_SONGS_FAIL });
    }
  };
}

export function loadSongsForAllMoods(moodIds) {
  return async (dispatch) => {
    await TrackPlayer.reset();
    dispatch({ type: LOAD_SONGS });
    try {
      const songsPromises = [];
      for (let i = 0; i < moodIds.length; i++) {
        const songsPromise = axios.get(`https://api.moodindustries.com/api/v1/moods/${moodIds[i]}/songs`,
          {
            params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
            responseType: 'json',
          });
        songsPromises.push(songsPromise);
      }

      const songsLists = await Promise.all(songsPromises);

      // fill allMoodSongs with the list of songs associated with each mood
      const allMoodSongs = [];
      Object.values(songsLists)
        .forEach(curMoodSongs => Array.prototype.push.apply(allMoodSongs, curMoodSongs.data));

      dispatch({ type: LOAD_SONGS_SUCCESS, payload: { data: allMoodSongs } });
      dispatch(handlePlayPress());
      dispatch(startScoreTimer());
    } catch (e) {
      dispatch({ type: LOAD_SONGS_FAIL });
    }
  };
}

export function loadQueueStartingAtId(startSongIndex, songs) {
  return async (dispatch) => {
    await TrackPlayer.reset();
    dispatch({ type: RESET_QUEUE });

    dispatch({
      type: LOAD_QUEUE_STARTING_AT_ID,
      startSongIndex,
      songs,
    });

    const selectedLeaderboardSong = songs[startSongIndex];

    // maybe move this into a helper function
    await TrackPlayer.add(songs);
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
      const songs = await axios.get(`https://api.moodindustries.com/api/v1/moods/${sharedTrack.mood_id}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SHARED_SONG_QUEUE_SUCCESS, payload: songs });
      dispatch(handlePlayPress());
      dispatch(startScoreTimer());
    } catch (e) {
      dispatch({ type: LOAD_SHARED_SONG_QUEUE_FAIL });
    }
  };
}

// TrackPlayer event action creators
export function playbackState(state) {
  // called on play/pauseevent
  return {
    type: PLAYBACK_STATE,
    state,
  };
}

export function playbackTrack(track) {
  // called on track changed event
  return (dispatch, getState) => {
    const { queue, queueType } = getState().queue;

    // find new current track
    const newCurTrackIndex = queue.findIndex(findTrack => findTrack.id === track);
    let newCurTrack = queue[newCurTrackIndex];

    // if no track found, set curTrack to first in the queue
    if (newCurTrack === undefined) newCurTrack = queue[0];

    dispatch({
      newCurTrack,
      newCurTrackIndex,
      type: PLAYBACK_TRACK,
      track,
    });

    // do not log analytic or start score timer for an empty queue
    if (!queue.length) return;

    dispatch(
      logEvent(
        anal.songPlay,
        songPlayAnalyticEventFactory(anal.songPlay, queueType, newCurTrack),
      ),
    );

    dispatch(startScoreTimer());
  };
}

export function handleDuck(data) {
  return async () => {
    // Explicit ducking is only supported by android, iOS handles it it's own way
    if (Platform.OS === 'ios') return;

    const { permanent, ducking, paused } = data;
    if (permanent === true) await TrackPlayer.pause();
    if (ducking) await TrackPlayer.pause(); // could just change vol here
    if (paused) await TrackPlayer.pause();
    if (!ducking && !paused && !permanent) await TrackPlayer.play();
  };
}
