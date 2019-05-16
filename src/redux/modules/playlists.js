import axios from 'axios';
import firebase from 'react-native-firebase';
import {
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL,
  PLAYLIST_SCROLL_IS_NEGATIVE,
  PLAYLIST_SCROLL_IS_NOT_NEGATIVE,
  SET_PLAYLIST_MODAL_FULL_SCREEN,
  SET_PLAYLIST_MODAL_HALF_SCREEN,
  UPDATE_NEW_PLAYLIST_NAME,
  PLAYLIST_LOAD_SONGS,
  PLAYLIST_LOAD_SONGS_SUCCESS,
  PLAYLIST_LOAD_SONGS_FAIL,
} from '../constants';
import { mapSongsToValidTrackObjects } from '../util';

const initialState = {
  playlists: [],
  isCreatePlaylistModalOpen: false,
  newPlaylistName: '',
  loading: false,
  error: {},
  playlistScrollIsNegative: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isCreatePlaylistModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, isCreatePlaylistModalOpen: false };
    case UPDATE_NEW_PLAYLIST_NAME:
      return { ...state, newPlaylistName: action.newPlaylistName };

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

    case PLAYLIST_SCROLL_IS_NEGATIVE:
      return { ...state, playlistScrollIsNegative: true };
    case PLAYLIST_SCROLL_IS_NOT_NEGATIVE:
      return { ...state, playlistScrollIsNegative: false };

    case SET_PLAYLIST_MODAL_FULL_SCREEN:
      return { ...state, isPlaylistModalFullScreen: true };
    case SET_PLAYLIST_MODAL_HALF_SCREEN:
      return { ...state, isPlaylistModalFullScreen: false };

    default:
      return state;
  }
}

/* Action Creators */
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
          song_ids: [111],
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
      console.warn('playlists: ', playlists);
      dispatch({ type: LOAD_PLAYLISTS_SUCCESS, payload: playlists });
    } catch (e) {
      console.warn(e);
      dispatch({ type: LOAD_PLAYLISTS_FAIL });
    }
  };
}

export function loadPlaylistSongs(id) {
  return async (dispatch) => {
    dispatch({ type: PLAYLIST_LOAD_SONGS });
    try {
      // let songs = await axios.get('https://api.moodindustries.com/api/v1/stats/leaderboard',
      let songs = await axios.get(`http://localhost:3000/api/v1/playlists/${id}`,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
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
