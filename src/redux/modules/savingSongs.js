import axios from 'axios';
import {
  ADD_SONG_TO_DELETED,
  DELETE_SAVED_SONGS,
  REMOVE_SONG_FROM_DELETED,
  SAVE_SONG,
  SAVE_SONG_SUCCESS,
  SAVE_SONG_FAIL,
  LOAD_SAVED_SONGS,
  LOAD_SAVED_SONGS_SUCCESS,
  LOAD_SAVED_SONGS_FAIL,
} from '../constants';
import { mapSongsToValidTrackObjects } from './leaderboard';

export const initialState = {
  songIdsToDelete: new Set(),
  loading: '',
  error: '',
  songs: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SONG_TO_DELETED:
      // get all the songs from the previous songIdsToDelete set
      const newsongIdsToDelete = new Set();
      if (state.songIdsToDelete === undefined) {
        newsongIdsToDelete.add(action.songIdToDelete);
      } else {
        state.songIdsToDelete.forEach(song => newsongIdsToDelete.add(song));
        newsongIdsToDelete.add(action.songIdToDelete);
      }

      return { ...state, songIdsToDelete: newsongIdsToDelete };

    case REMOVE_SONG_FROM_DELETED:
      if (state.songIdsToDelete === undefined) {
        // if somehow you can resave songs but your deleted set is empty, just return the previous state
        return { ...state };
      }
      // copy all the songs from the previous songIdsToDelete set into a new set
      const songIdsToDeleteAfterResaving = new Set();
      state.songIdsToDelete.forEach(song => songIdsToDeleteAfterResaving.add(song));
      // remove the songs to resave from the deleted set
      songIdsToDeleteAfterResaving.delete(action.songIdToResave);

      return { ...state, songIdsToDelete: songIdsToDeleteAfterResaving };

    case DELETE_SAVED_SONGS:
      return { ...state, songIdsToDelete: new Set() };

    case SAVE_SONG:
      return { ...state, loading: true };
    case SAVE_SONG_SUCCESS:
      return { loading: false, error: '' };
    case SAVE_SONG_FAIL:
      return { loading: false, error: action.e };

    case LOAD_SAVED_SONGS:
      return { ...state, loading: true };
    case LOAD_SAVED_SONGS_SUCCESS:
      // TODO: fuck this mapsongs, just get a well built object from api
      const songs = mapSongsToValidTrackObjects(action.payload.data);
      return { loading: false, error: '', songs };
    case LOAD_SAVED_SONGS_FAIL:
      return { loading: false, error: action.e };

    default:
      return state;
  }
}

export function saveSong(song) {
  return async (dispatch) => {
    dispatch({ type: SAVE_SONG });
    const songToSaveId = song.id;
    try {
      await axios.post(`http://api.moodindustries.com/api/v1/songs/${songToSaveId}/save`,
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          song,
        });
      dispatch({ type: SAVE_SONG_SUCCESS });
    } catch (e) {
      dispatch({ type: SAVE_SONG_FAIL, e });
    }
  };
}

export function addSongToDeleted(savedSongToDelete) {
  // for when people 'uncheck' a saved song
  return {
    type: ADD_SONG_TO_DELETED,
    songIdToDelete: savedSongToDelete.id,
  };
}

export function removeSongFromDeleted(songToResave) {
  return {
    type: REMOVE_SONG_FROM_DELETED,
    songIdToResave: songToResave.id,
  };
}

export function loadSavedSongs() {
  // should only be called when navigating away from saved song screen
  return async (dispatch) => {
    dispatch({ type: LOAD_SAVED_SONGS });
    try {
      // TODO: replace leaderboard endpoint with savedSongs
      let songs = await axios.get('http://api.moodindustries.com/api/v1/stats/leaderboard',
        {
          // TODO: give the endpoint a userid
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SAVED_SONGS_SUCCESS, payload: songs });
    } catch (e) {
      dispatch({ type: LOAD_SAVED_SONGS_FAIL });
    }
  };
}

export function deleteSongs() {
  // should only be called when navigating away from saved song screen
  return async (dispatch, getState) => {
    // get the user id off state, get the songIdsToDelete(), make the api call to actually delete from users savedSongs
    dispatch({ type: DELETE_SAVED_SONGS });
  };
}