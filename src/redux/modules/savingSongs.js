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
  songsToDelete: new Set(),
  loading: '',
  error: '',
  songs: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SONG_TO_DELETED:
      // get all the songs from the previous songsToDelete set
      const newSongsToDelete = new Set();
      state.songsToDelete.forEach(song => newSongsToDelete.add(song));
      newSongsToDelete.add(action.songToDelete.id);
      console.log('new deleted set: ', newSongsToDelete);
      return { ...state, songsToDelete: newSongsToDelete };
    case REMOVE_SONG_FROM_DELETED:
      // get all the songs from the previous songsToDelete set
      const songsToDeleteAfterResaving = new Set();
      state.songsToDelete.forEach(song => songsToDeleteAfterResaving.add(song));
      songsToDeleteAfterResaving.delete(action.songToResave);
      console.log('new deleted set: ', newSongsToDelete);
      return { ...state, songsToDelete: songsToDeleteAfterResaving };

    case DELETE_SAVED_SONGS:
      return { ...state, songsToDelete: new Set() };

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
  return (dispatch, getState) => {
    dispatch({ type: SAVE_SONG });
    const songToSaveId = song.id;
    try {
      axios.post(`http://api.moodindustries.com/api/v1//songs/${songToSaveId}/save`,
        {
          stars: getState().score.scoreDelta, t: 'EXVbAWTqbGFl7BKuqUQv',
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
    songToDelete: savedSongToDelete,
  };
}

export function removeSongFromDeleted(songToResave) {
  return {
    type: REMOVE_SONG_FROM_DELETED,
    songToResave,
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
    // get the user id off state, get the songsToDelete(), make the api call to actually delete
    dispatch({ type: DELETE_SAVED_SONG });
  };
}