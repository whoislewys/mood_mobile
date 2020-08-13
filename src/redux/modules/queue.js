import axios from 'axios';
import { createSelector } from 'reselect';
import TrackPlayer from 'react-native-track-player';
import { Platform } from 'react-native';
import { mapSongsToValidTrackObjects, shuffle, songPlayAnalyticEventFactory } from '../util';
import { clearScore } from './score-v2';
import { logEvent } from './analytics';
import NavigationService from '../../navigation/navigation-service';
import {
  anal,
  FILL_QUEUE,
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
  FINISHED_NAVVING_TO_PLAY_SCREEN,
} from '../constants';

export const initialState = {
  curTrackId: null,
  curTrackIndex: NaN,
  errors: null,
  loading: false,
  navvingToPlayScreen: false,
  playbackState: -1,
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

    // v2
    case FILL_QUEUE:
      let moodSongs = [];
      moodSongs = action.songs;
      return {
        ...state,
        loading: false,
        queue: moodSongs,
        // curTrack: moodSongs[0],
        curTrackIndex: 0,
        queueType: MOOD_TYPE,
      };

    case LOAD_SONGS:
      return {
        ...state,
        loading: true,
        navvingToPlayScreen: true,
        queue: [],
        curTrack: null,
        curTrackIndex: NaN,
        track: null,
        queueType: '',
      };
    case LOAD_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FINISHED_NAVVING_TO_PLAY_SCREEN:
      return {
        ...state,
        navvingToPlayScreen: false,
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
        navvingToPlayScreen: true,
        queue: songs,
        curTrackIndex: startSongIndex,
        queueType: '',
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
        curTrackIndex: 0,
      };

    case PLAYBACK_STATE:
      return {
        ...state, playbackState: action.playbackState,
      };

    case PLAYBACK_TRACK:
      return {
        ...state, curTrackId: action.curTrackId,
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

/* Selectors */
const getCurrentTrackId = (state) => {
  return state.queue.curTrackId;
};

const getQueue = (state) => {
  return state.queue.queue;
};

export const getCurrentTrackSelector = createSelector(
  [getQueue, getCurrentTrackId],
  (queue, curTrackId) => {
    const newCurTrackIndex = queue.findIndex(findTrack => findTrack.id === curTrackId);
    const newCurTrack = queue[newCurTrackIndex];
    return newCurTrack;
  },
);

export const getCurrentTrackIndex = createSelector(
  [getQueue, getCurrentTrackId],
  (queue, curTrackId) => {
    const newCurTrackIndex = queue.findIndex(findTrack => findTrack.id === curTrackId);
    return newCurTrackIndex;
  },
);

/* Action Creators */
// TrackPlayer controls
// export function handlePlayPress() {
//   return async (dispatch, getState) => {
//     // try curtrack here instead of track too
//     const { track, queue, playback } = getState().queue;
//     if (track === null) {
//       await TrackPlayer.reset();
//       await TrackPlayer.add(queue);
//       await TrackPlayer.play();
//     } else if (playback === TrackPlayer.STATE_PAUSED) {
//       await TrackPlayer.play();
//     } else {
//       await TrackPlayer.pause();
//     }
//   };
// }

export function handlePlayPress() {
  return async (dispatch) => {
    const playbackState = await TrackPlayer.getState();
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      // console.warn('playback state pause, playing');
      await TrackPlayer.play();
    } else {
      // console.warn('playback state pause, playing');
      await TrackPlayer.pause();
    }
  };
}


export function shufflePlay(songs) {
  return async (dispatch) => {
    const shuffledSongs = shuffle(songs);
    dispatch({ type: RESET_QUEUE });

    try {
      await TrackPlayer.reset();
    } catch (e) {
      console.warn('tp reset err: ', e);
    }

    try {
      await TrackPlayer.add(shuffledSongs);
    } catch (e) {
      console.warn('tp add err: ', e);
    }

    try {
      await TrackPlayer.play();
    } catch (e) {
      console.warn('tp play err: ', e);
    }

    dispatch({
      type: FILL_QUEUE,
      songs: shuffledSongs,
    });

    NavigationService.navigate('Play');
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
  };
}

export function skipToPrevious() {
  return async (dispatch) => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
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
export function finishedNavvingToPlayScreen() {
  return ({
    type: FINISHED_NAVVING_TO_PLAY_SCREEN,
  });
}

/// Instead of filling queue with our own logic, fill it by reacting to track player events
export function loadSongsForMoodId2(moodId) {
  return async (dispatch) => {
    // set loading
    dispatch({ type: LOAD_SONGS });

    try {
      await TrackPlayer.reset();
    } catch (e) {
      console.warn('error restting tp: ', e);
    }

    let songs;
    try {
      const songsResp = await axios.get(`https://api.moodindustries.com/api/v1/moods/${moodId}/songs`, {
        params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
        responseType: 'json',
      });
      songs = songsResp.data;
    } catch (e) {
      console.warn('axios error:', e);
    }

    try {
      const trackPlayerSongs = shuffle(mapSongsToValidTrackObjects(songs));
      await TrackPlayer.add(trackPlayerSongs);
      dispatch({
        type: FILL_QUEUE,
        songs: trackPlayerSongs,
      });
    } catch (e) {
      console.warn('unhandled add tp e: ', e);
    }

    try {
      await TrackPlayer.play();
    } catch (e) {
      console.warn('unhandled play tp e: ', e);
    }

    dispatch({ type: LOAD_SONGS_SUCCESS });
    NavigationService.navigate('Play');
    setTimeout(() => dispatch(finishedNavvingToPlayScreen()), 300);
  };
}

export function loadSongsForAllMoods2(moodIds) {
  return async (dispatch) => {
    dispatch({ type: LOAD_SONGS });

    try {
      await TrackPlayer.reset();
    } catch (e) {
      console.warn('error restting tp: ', e);
    }

    let songsLists;
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
      songsLists = await Promise.all(songsPromises);
    } catch (e) {
      console.warn('error getting all mood songs');
    }

    // fill allMoodSongs with the list of songs associated with each mood
    const allMoodSongs = [];
    Object.values(songsLists)
      .forEach(curMoodSongs => Array.prototype.push.apply(allMoodSongs, curMoodSongs.data));
    const allSongsShuffled = shuffle(mapSongsToValidTrackObjects(allMoodSongs));

    try {
      await TrackPlayer.add(allSongsShuffled);
      dispatch({
        type: FILL_QUEUE,
        songs: allSongsShuffled,
      });
    } catch (e) {
      console.warn('unhandled add tp e: ', e);
    }

    try {
      await TrackPlayer.play();
    } catch (e) {
      console.warn('unhandled play tp e: ', e);
    }

    dispatch({ type: LOAD_SONGS_SUCCESS });
    NavigationService.navigate('Play');
    setTimeout(() => dispatch(finishedNavvingToPlayScreen()), 300);
  };
}

export function loadQueueStartingAtSong(startSongIndex, startSongId, songs) {
  return async (dispatch) => {
    dispatch({ type: LOAD_SONGS });
    try {
      await TrackPlayer.reset();
    } catch (e) {
      console.warn('error restting tp: ', e);
    }

    try {
      // if songs to play is only one song
      if (songs.length === 0) {
        await TrackPlayer.add(songs);

        dispatch({
          type: FILL_QUEUE,
          songs,
        });
      } else {
        // split songs into song clicked,
        // songs before song clicked,
        // and songs after song clicked
        const selectedSong = songs[startSongIndex];
        const songsBeforeSelected = songs.slice(0, startSongIndex);
        const songsAfterSelected = songs.slice(startSongIndex);
        // add song clicked at the start of the queue
        await TrackPlayer.add(selectedSong);

        // add any songs before
        // https://react-native-track-player.js.org/documentation/#track-structure
        await TrackPlayer.add(songsBeforeSelected, startSongId);

        // add any songs after
        // Pass second arg of null to add it at the end of the queue
        await TrackPlayer.add(songsAfterSelected, null);

        dispatch({
          type: FILL_QUEUE,
          songs: [selectedSong, ...songsBeforeSelected, ...songsAfterSelected],
        });
      }
    } catch (e) {
      console.warn('unhandled add tp e: ', e);
    }

    try {
      await TrackPlayer.play();
    } catch (e) {
      console.warn('unhandled skip tp e: ', e);
    }

    dispatch({ type: LOAD_SONGS_SUCCESS });
    NavigationService.navigate('Play');
    setTimeout(() => dispatch(finishedNavvingToPlayScreen()), 300);
  };
}

// Shared song action creators
export function loadSharedSongQueue(sharedTrack) {
  return async (dispatch) => {
    dispatch({ type: LOAD_SONGS });

    try {
      await TrackPlayer.reset();
    } catch (e) {
      console.warn('reset tp err: ', e);
    }

    let songs;
    try {
      const songsResp = await axios.get(`https://api.moodindustries.com/api/v1/moods/${sharedTrack.mood_id}/songs`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      songs = songsResp.data;
    } catch (e) {
      console.warn('axios error:', e);
    }

    try {
      const trackPlayerSongs = shuffle(mapSongsToValidTrackObjects(songs));
      trackPlayerSongs.unshift(sharedTrack);
      await TrackPlayer.add(trackPlayerSongs);
      dispatch({
        type: FILL_QUEUE,
        songs: trackPlayerSongs,
      });
    } catch (e) {
      console.warn('unhandled add tp e: ', e);
    }

    try {
      await TrackPlayer.play();
    } catch (e) {
      console.warn('unhandled play tp e: ', e);
    }

    dispatch({ type: LOAD_SONGS_SUCCESS });
    NavigationService.navigate('Play');
    setTimeout(() => dispatch(finishedNavvingToPlayScreen()), 300);
  };
}

export function playbackState2(data) {
  // called on play/pauseevent
  return {
    type: PLAYBACK_STATE,
    playbackState: data.state,
  };
}

export function playbackTrack2(data) {
  return (dispatch, getState) => {
    // when a new track comes through, clear the score
    dispatch(clearScore());

    dispatch({
      type: PLAYBACK_TRACK,
      curTrackId: data.nextTrack,
    });

    const queueType = getState().queueType;
    // log songPlay analytic
    dispatch(
      logEvent(
        anal.songPlay,
        songPlayAnalyticEventFactory(anal.songPlay, queueType, data.nextTrack),
      ),
    );
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
    if (!ducking && !paused && !permanent) await TrackPlayer.pause();
  };
}
