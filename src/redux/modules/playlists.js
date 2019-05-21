import axios from 'axios';
import firebase from 'react-native-firebase';
import {
  ADD_TO_NEW_PLAYLIST_SONGS,
  ADD_SONG_TO_DELETED,
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAIL,
  LOAD_SAVED_SONGS,
  LOAD_SAVED_SONGS_SUCCESS,
  LOAD_SAVED_SONGS_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL,
  PLAYLIST_SCROLL_IS_NEGATIVE,
  PLAYLIST_SCROLL_IS_NOT_NEGATIVE,
  REMOVE_SONG_FROM_DELETED,
  SAVE_RANKED_SONG,
  SET_CUR_PLAYLIST_ID,
  SET_PLAYLIST_MODAL_FULL_SCREEN,
  SET_PLAYLIST_MODAL_HALF_SCREEN,
  SET_SAVED_SONG_PLAYLIST_ID,
  UPDATE_NEW_PLAYLIST_NAME,
  UPDATE_PLAYLIST,
  UPDATE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_FAIL,
  PLAYLIST_LOAD_SONGS,
  PLAYLIST_LOAD_SONGS_SUCCESS,
  PLAYLIST_LOAD_SONGS_FAIL,
  RESET_SAVED_SONGS_SET,
} from '../constants';
import { mapSongsToValidTrackObjects } from '../util';

export const initialState = {
  curPlaylistTitle: '',
  error: {},
  isCreatePlaylistModalOpen: false,
  loading: false,
  newPlaylistName: '',
  playlists: [],
  playlistScrollIsNegative: false,
  savedSongs: [],
  savedSongsPlaylistId: -1,
  newPlaylistSongs: new Set(), // keeps track of songs to add to a new playlist
  songIdsToAdd: new Set(),
  songIdsToDelete: new Set(), // keeps track of songs the user wants to remove from the cur playlist
  songz: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Client

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

    case SET_SAVED_SONG_PLAYLIST_ID:
      return { ...state, savedSongsPlaylistId: action.savedSongsPlaylistId };

    // new playlist modal
    case OPEN_MODAL:
      return { ...state, isCreatePlaylistModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, isCreatePlaylistModalOpen: false };
    case UPDATE_NEW_PLAYLIST_NAME:
      return { ...state, newPlaylistName: action.newPlaylistName };

    case ADD_TO_NEW_PLAYLIST_SONGS:
      const newestPlaylistSongs = new Set();
      if (state.newPlaylistSongs === undefined) {
        newestPlaylistSongs.add(action.songIdToSave);
      } else {
        state.newPlaylistSongs.forEach(song => newestPlaylistSongs.add(song));
        newestPlaylistSongs.add(action.songIdToSave);
      }
      return { ...state, newPlaylistSongs: newestPlaylistSongs };
    case RESET_SAVED_SONGS_SET:
      return { ...state, newPlaylistSongs: new Set() };

    case PLAYLIST_SCROLL_IS_NEGATIVE:
      return { ...state, playlistScrollIsNegative: true };
    case PLAYLIST_SCROLL_IS_NOT_NEGATIVE:
      return { ...state, playlistScrollIsNegative: false };
    case SET_PLAYLIST_MODAL_FULL_SCREEN:
      return { ...state, isPlaylistModalFullScreen: true };
    case SET_PLAYLIST_MODAL_HALF_SCREEN:
      return { ...state, isPlaylistModalFullScreen: false };

    // Service
    case CREATE_PLAYLIST:
      return { ...state, loading: true };
    case CREATE_PLAYLIST_SUCCESS:
      return { ...state, loading: false };
    case CREATE_PLAYLIST_FAIL:
      return { ...state, loading: false, error: 'Error while creating playlist' };

    case LOAD_PLAYLISTS:
      return { ...state, loading: true };
    case LOAD_PLAYLISTS_SUCCESS:
      const playlists = action.payload.data;
      return { ...state, loading: false, playlists };
    case LOAD_PLAYLISTS_FAIL:
      return { ...state, loading: false, error: 'Error while fetching playlist' };

    case LOAD_SAVED_SONGS:
      return { ...state, loading: true };
    case LOAD_SAVED_SONGS_SUCCESS:
      const savedSongs = mapSongsToValidTrackObjects(action.savedSongs.data.songs);
      return {
        ...state,
        savedSongs,
        loading: false,
      };
    case LOAD_SAVED_SONGS_FAIL:
      return { ...state, loading: false, error: action.e };

    case PLAYLIST_LOAD_SONGS:
      return { ...state, loading: true };
    case PLAYLIST_LOAD_SONGS_SUCCESS:
      console.warn('songs for playlist: ', action.payload.data.songs);
      // const songs = mapSongsToValidTrackObjects(action.payload.data.songs);
      return { ...state };
    case PLAYLIST_LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching leaderboard.',
      };
    default:
      return state;
  }
}

/* Action Creators */
// Client side
export function openModal() {
  return {
    type: OPEN_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function addToNewPlaylistSongs(newPlaylistSong) {
  return {
    type: ADD_TO_NEW_PLAYLIST_SONGS,
    songIdToSave: newPlaylistSong.id,
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

export function setCurrentPlaylist(curPlaylist) {
  return {
    type: SET_CUR_PLAYLIST_ID,
    curPlaylistTitle: curPlaylist.title,
  };
}

// Service

export function updateNewPlaylistName(newPlaylistName) {
  return {
    type: UPDATE_NEW_PLAYLIST_NAME,
    newPlaylistName,
  };
}

export function createPlaylist() {
  return async (dispatch, getState) => {
    // start by closing the new playlist modal and checking if user is logged in
    dispatch(closeModal());

    if (!getState().auth.userIsLoggedIn) return;

    dispatch({ type: CREATE_PLAYLIST });
    try {
      // submit new playlist
      const playlistNameToSubmit = getState().playlists.newPlaylistName === '' ? 'New Playlist'
        : getState().playlists.newPlaylistName;
      console.warn('creating playlist: ', playlistNameToSubmit);
      const token = await firebase.auth().currentUser.getIdToken();
      const newPlaylist = await axios.post('http://localhost:3000/api/v1/playlists',
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          name: playlistNameToSubmit,
          description: '',
          song_ids: Array.from(getState().playlists.newPlaylistSongs),
        },
        { headers: { Authorization: token } });
      const newPlaylistId = newPlaylist.data.id;
      // dispatch success action & refresh the list of playlists
      dispatch({ type: CREATE_PLAYLIST_SUCCESS, payload: newPlaylistId });
    } catch (err) {
      // in case an error happened, close the modal
      dispatch(closeModal());
      dispatch({ type: CREATE_PLAYLIST_FAIL, err });
    }
  };
}

export function loadPlaylists() {
  return async (dispatch) => {
    dispatch({ type: LOAD_PLAYLISTS });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const playlists = await axios.get('http://localhost:3000/api/v1/playlists',
        {
          headers: { Authorization: token },
          t: 'EXVbAWTqbGFl7BKuqUQv',
        });
      dispatch({ type: LOAD_PLAYLISTS_SUCCESS, payload: playlists });
    } catch (e) {
      dispatch({ type: LOAD_PLAYLISTS_FAIL });
    }
  };
}

export function loadSongsForPlaylistId(id) {
  return async (dispatch) => {
    dispatch({ type: PLAYLIST_LOAD_SONGS });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const songs = await axios.get(`http://localhost:3000/api/v1/playlists/${id}`,
        {
          headers: { Authorization: token },
          t: 'EXVbAWTqbGFl7BKuqUQv',
        });
      dispatch({
        type: PLAYLIST_LOAD_SONGS_SUCCESS,
        payload: songs,
      });
    } catch (e) {
      console.warn('error: ', e);
      dispatch({ type: PLAYLIST_LOAD_SONGS_FAIL });
    }
  };
}

export function updatePlaylist(id, song_ids) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PLAYLIST });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const songs = await axios.patch(`http://localhost:3000/api/v1/playlists/${id}`,
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          // can change name, description, & song_ids in here
          song_ids,
        },
        { headers: { Authorization: token } });
      dispatch({
        type: UPDATE_PLAYLIST_SUCCESS,
        payload: songs,
      });
    } catch (e) {
      dispatch({ type: UPDATE_PLAYLIST_FAIL });
    }
  };
}

export function resetNewPlaylistSongs() {
  return ({ type: RESET_SAVED_SONGS_SET });
}


export function getSavedSongPlaylist() {
  // TODO: add logic in splash when handling shares to check that they are logged in before navigating to playlists
  return async (dispatch, getState) => {
    // check for playlists
    let playlists = getState().playlists.playlists;
    if (!playlists.length) {
      // if playlists haven't been loaded, load them
      await dispatch(loadPlaylists());
    }

    // // now that playlists are loaded, look for saved song playlist
    playlists = getState().playlists.playlists;
    const savedSongsPlaylist = playlists.find(p => p.name === 'Saved Songs');
    if (savedSongsPlaylist !== undefined) {
      const savedSongsPlaylistId = savedSongsPlaylist.id;
      // 'Saved Songs' playlist found, save the id and the songs
      dispatch({
        type: SET_SAVED_SONG_PLAYLIST_ID,
        savedSongsPlaylistId,
      });
    } else {
      // if we couldn't find the 'Saved Songs' playlist, create it
      try {
        const token = await firebase.auth()
          .currentUser
          .getIdToken();
        const newPlaylist = await axios.post('http://localhost:3000/api/v1/playlists',
          {
            t: 'EXVbAWTqbGFl7BKuqUQv',
            name: 'Saved Songs',
            description: '',
            song_ids: [],
          },
          { headers: { Authorization: token } });
        const newPlaylistId = newPlaylist.data.id;
        console.warn('new saved song playlist:', newPlaylistId);
        dispatch({
          type: SET_SAVED_SONG_PLAYLIST_ID,
          newPlaylistId,
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };
}

export function loadSavedSongs() {
  // loads the current user's saved songs playlist into the store
  return async (dispatch, getState) => {
    dispatch({
      type: LOAD_SAVED_SONGS,
    });
    try {
      if (getState().playlists.savedSongsPlaylistId === -1) {
        await dispatch(getSavedSongPlaylist());
      }
      const savedSongsPlaylistId = getState().playlists.savedSongsPlaylistId;
      const token = await firebase.auth().currentUser.getIdToken();
      const savedSongs = await axios.get(`http://localhost:3000/api/v1/playlists/${savedSongsPlaylistId}`,
        {
          headers: { Authorization: token },
          t: 'EXVbAWTqbGFl7BKuqUQv',
        });
      dispatch({
        type: LOAD_SAVED_SONGS_SUCCESS,
        savedSongs,
      });
    } catch (e) {
      dispatch({
        type: LOAD_SAVED_SONGS_FAIL,
        error: e,
      });
    }
  };
}

export function saveSong(song) {
  // should save song to saved songs playlist
  return async (dispatch, getState) => {
    if (getState().playlists.savedSongs) {
      // if the user hasn't loaded their saved songs yet, load it for them
      await dispatch(loadSavedSongs());
    }
    dispatch({ type: SAVE_RANKED_SONG });

    let savedSongsPlaylistId = getState().playlists.savedSongsPlaylistId;
    if (savedSongsPlaylistId === -1) {
      // saved songs playlist has not been found yet. create it
      await dispatch(getSavedSongPlaylist());
    }

    savedSongsPlaylistId = getState().playlists.savedSongsPlaylistId;
    const savedSongs = getState().playlists.savedSongs;
    const savedSongIds = savedSongs.map(s => s.id);
    savedSongIds.push(song.id);
    dispatch(updatePlaylist(savedSongsPlaylistId, savedSongIds));
  };
}

export function setPlaylistScrollingNegative() {
  return {
    type: PLAYLIST_SCROLL_IS_NEGATIVE,
  };
}

export function setPlaylistScrollingNotNegative() {
  return {
    type: PLAYLIST_SCROLL_IS_NOT_NEGATIVE,
  };
}

export function setPlaylistModalFullScreen() {
  return {
    type: SET_PLAYLIST_MODAL_FULL_SCREEN,
  };
}

export function setPlaylistModalHalfScreen() {
  return {
    type: SET_PLAYLIST_MODAL_HALF_SCREEN,
  };
}
