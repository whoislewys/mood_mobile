import axios from 'axios';

const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST';
const CREATE_PLAYLIST_SUCCESS = 'playlists/CREATE_PLAYLIST_SUCCESS';
const CREATE_PLAYLIST_FAIL = 'playlists/CREATE_PLAYLIST_FAIL';

const LOAD_PLAYLISTS = 'playlists/LOAD';
const LOAD_PLAYLISTS_SUCCESS = 'playlists/LOAD_SUCCESS';
const LOAD_PLAYLISTS_FAIL = 'playlists/LOAD_FAIL';

const OPEN_MODAL = 'playlists/OPEN_MODAL';
const CLOSE_MODAL = 'playlists/CLOSE_MODAL';
const UPDATE_NEW_PLAYLIST_NAME = 'playlists/UPDATE_NEW_PLAYLIST_NAME';

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
  return async (dispatch) => {
    dispatch({ type: CREATE_PLAYLIST });
    try {
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
