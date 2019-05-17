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
  SAVE_RANKED_SONG_SUCCESS,
  SAVE_RANKED_SONG_FAIL,
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
  songs: [],
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
      const playlists = action.payload;
      return { ...state, loading: false, playlists };
    case LOAD_PLAYLISTS_FAIL:
      return { ...state, loading: false, error: 'Error while fetching playlist' };

    case LOAD_SAVED_SONGS:
      return { ...state, loading: true };
    case LOAD_SAVED_SONGS_SUCCESS:
      return {
        ...state,
        savedSongs: mapSongsToValidTrackObjects(action.savedSongs),
        loading: false,
      };
    case LOAD_SAVED_SONGS_FAIL:
      return { ...state, loading: false, error: action.e };

    case PLAYLIST_LOAD_SONGS:
      return { ...state, loading: true };
    case PLAYLIST_LOAD_SONGS_SUCCESS:
      const songs = mapSongsToValidTrackObjects(action.payload.data);
      return { ...state, loading: false, songs };
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
      console.log('new playlist:', newPlaylist);
      const newPlaylistId = newPlaylist.data.id;
      // dispatch success action & refresh the list of playlists
      dispatch({ type: CREATE_PLAYLIST_SUCCESS, payload: newPlaylistId });
    } catch (err) {
      // in case an error happened, close the modal
      dispatch(closeModal());
      console.warn('err creating: ', err);
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
      console.warn('playlists res: ', playlists);
      const playlists_no_saved_song = playlists.data.filter(p => p.name !== 'Saved Songs');
      dispatch({ type: LOAD_PLAYLISTS_SUCCESS, payload: playlists_no_saved_song });
    } catch (e) {
      console.warn(e);
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
      dispatch({ type: PLAYLIST_LOAD_SONGS_FAIL });
    }
  };
}

export function updatePlaylist(id) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PLAYLIST });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const songs = await axios.patch(`http://localhost:3000/api/v1/playlists/${id}`,
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          // can change name, description, & song_ids in here
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

export function loadSavedSongs() {
  return async (dispatch, getState) => {
    dispatch({
      type: LOAD_SAVED_SONGS,
    });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const savedSongs = await axios.get(`http://localhost:3000/api/v1/playlists/${getState().playlists.savedSongsPlaylistId}`,
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

export function getSavedSongPlaylist() {
  // TODO: add logic in splash when handling shares to check that they are logged in before navigating to playlists
  return async (dispatch, getState) => {
    // check for playlists
    const playlists = getState().playlists.songs;
    if (playlists.length) {
      // if they're not there, load them
      dispatch(loadPlaylists());
    }

    // now playlists should be loaded
    const savedSongsPlaylistId = playlists.find(p => p.name === 'Saved Songs');
    if (savedSongsPlaylistId !== -1) {
      // 'Saved Songs' playlist found, save the id and the songs
      dispatch({
        type: SET_SAVED_SONG_PLAYLIST_ID,
        savedSongsPlaylistId,
      });
      // dispatch({
      //   type: LOAD_PLAYLISTS_SUCCESS,
      //   savedSongsPlaylistId,
      // });
    } else {
      // if we couldn't find the 'Saved Songs' playlist, create it
      // createPlaylist gets new playlist data from the store,
      // so let's get the store in a place where there's no songs to add to the new playlist
      // and let's name the new playlist 'Saved Songs' before creation
      dispatch(resetNewPlaylistSongs());
      dispatch(updateNewPlaylistName('Saved Songs'));
      dispatch(createPlaylist());
      dispatch({
        type: SET_SAVED_SONG_PLAYLIST_ID,
        savedSongsPlaylistId,
      });
    }
  };
}

export function saveSong(song) {
  // should save song to saved songs playlist
  return async (dispatch, getState) => {
    dispatch({ type: SAVE_RANKED_SONG });

    const { savedSongsPlaylistId } = getState().savingSongs;
    if (savedSongsPlaylistId === -1) {
      // -1 means the saved song playlist has not been found yet. fix that
      dispatch(getSavedSongPlaylist);
    }
    const songToSaveId = [song.id];
    try {
      await axios.post(`http://localhost:3000/api/v1/playlists/${savedSongsPlaylistId}`,
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          savedSongsPlaylistId,
          songToSaveId,
        });
      dispatch({ type: SAVE_RANKED_SONG_SUCCESS });
    } catch (e) {
      dispatch({
        type: SAVE_RANKED_SONG_FAIL,
      });
    }
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
