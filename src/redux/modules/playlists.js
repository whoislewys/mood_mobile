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
} from '../constants';
import { mapSongsToValidTrackObjects } from './leaderboard';

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
      // TODO: fuck this mapsongs, just get a well built object from api
      const songs = mapSongsToValidTrackObjects(action.payload.data);
      return { ...state, loading: false, playlists: songs };
    case LOAD_PLAYLISTS_FAIL:
      return { ...state, loading: false, error: 'Error while fetching playlist' };

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
      // const newPlaylistId = await axios.post('https://api.moodindustries.com/api/v1/playlists',
      const token = await firebase.auth().currentUser.getIdToken(true);
      const newPlaylist = await axios.post('http://localhost:3000/api/v1/playlists',
        {
          params: {
            t: 'EXVbAWTqbGFl7BKuqUQv',
            name: playlistNameToSubmit,
            description: 'shit',
            song_ids: [111],
          },
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
      const playlists = await axios.get('https://api.moodindustries.com/api/v1/playlists',
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          headers: { Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken(true)}` },
          responseType: 'json',
        });
      dispatch({ type: LOAD_PLAYLISTS_SUCCESS, payload: playlists });
    } catch (e) {
      console.warn(e);
      dispatch({ type: LOAD_PLAYLISTS_FAIL });
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
