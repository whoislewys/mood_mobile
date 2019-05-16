import axios from 'axios';
import firebase from 'react-native-firebase';
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
import { mapSongsToValidTrackObjects } from '../util';

export const initialState = {
  songIdsToDelete: new Set(), // keeps tracks of songs the user wants to remove from the cur playlist
  loading: '',
  error: '',
  songs: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SONG_TO_DELETED:
      // get all the songs from the previous songIdsToDelete set
      const newSongIdsToDelete = new Set();
      if (state.songIdsToDelete === undefined) {
        newSongIdsToDelete.add(action.songIdToDelete);
      } else {
        state.songIdsToDelete.forEach(song => newSongIdsToDelete.add(song));
        newSongIdsToDelete.add(action.songIdToDelete);
      }

      return { ...state, songIdsToDelete: newSongIdsToDelete };

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
  // should save song to current playlist
  // if there is no active curPlaylistId in queue state, it should save to current user's "saved songs" playlist
  return async (dispatch, getState) => {
    dispatch({ type: SAVE_SONG });
    const jwt = await firebase.auth().currentUser.getIdToken();
    const playlistId = getState().queue.curPlaylistId;
    if (playlistId === -1) {
    // should default to curUsers savedSong's playlist
    }

    const songToSaveId = song.id;
    try {
      await axios.post('http://api.moodindustries.com/api/v1/songs/save',
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          jwt,
          playlistId,
          songToSaveId,
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
      const songs = await axios.get('http://api.moodindustries.com/api/v1/stats/leaderboard',
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

// export function deleteSongs() {
//   // should only be called when navigating away from saved song screen
//   return async (dispatch, getState) => {
//     // get the user id off state, get the songIdsToDelete(), make the api call to actually delete from users savedSongs
//     axios.patch('')
//     dispatch({ type: DELETE_SAVED_SONGS });
//   };
// }
