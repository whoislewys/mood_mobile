import axios from 'axios';

import {
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_NEW_PLAYLIST_NAME,
} from '../constants';

const initialState = {
  playlists: [],
  isCreatePlaylistModalOpen: false,
  newPlaylistName: '',
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
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
      return { ...state, loading: false, playlists: action.payload.playlists };
    case LOAD_PLAYLISTS_FAIL:
      return { ...state, loading: false, error: 'Error while fetching playlist' };
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

export function createPlaylist(userId) {
  return async (dispatch, getState) => {
    dispatch({ type: CREATE_PLAYLIST });
    try {
      if (!getState().auth.userIsLoggedIn) return;
      let playlists = await axios.post('http://api.moodindustries.com/api/v1/playlists',
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv', userId },
          responseType: 'json',
        });
      dispatch({ type: CREATE_PLAYLIST_SUCCESS, payload: playlists });
      // refresh the playlists
      this.loadPlaylists();
    } catch (e) {
      dispatch({ type: CREATE_PLAYLIST_FAIL });
    }
  };
}

export function loadPlaylists(userId) {
  return async (dispatch) => {
    dispatch({ type: LOAD_PLAYLISTS });
    try {
      let playlists = await axios.get('http://api.moodindustries.com/api/v1/playlists',
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv', userId },
          responseType: 'json',
        });
      dispatch({ type: LOAD_PLAYLISTS_SUCCESS, payload: playlists });
    } catch (e) {
      dispatch({ type: LOAD_PLAYLISTS_FAIL });
    }
  };
}
