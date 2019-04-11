import axios from 'axios';
import {
  ADD_SONG_TO_DELETE_LIST,
  SAVE_SONG,
  SAVE_SONG_SUCCESS,
  SAVE_SONG_FAIL,
} from '../constants';

const initialState = {
  songsToDelete: [],
  loading: '',
  error: '',
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SONG_TO_DELETE_LIST:
      return { ...state, songsToDelete: action.songsToDelete };
    case SAVE_SONG:
      return { ...state, loading: true };
    case SAVE_SONG_SUCCESS:
      return { loading: false, error: '' };
    case SAVE_SONG_FAIL:
      return { loading: false, error: action.e };
    default:
      return state;
  }
}

export function saveSong() {
  return (dispatch, getState) => {
    dispatch({ type: SAVE_SONG });
    const curTrackId = getState().queue.curTrack.id;
    try {
      axios.post(`http://api.moodindustries.com/api/v1//songs/${curTrackId}/save`,
        {
          stars: getState().score.scoreDelta, t: 'EXVbAWTqbGFl7BKuqUQv',
        });
      dispatch({ type: SAVE_SONG_SUCCESS });
    } catch (e) {
      dispatch({ type: SAVE_SONG_FAIL, e });
    }
  };
}

export function addSongToDeleteList(savedSongToDelete) {
  // for when people 'uncheck' a saved song
  console.warn('adding song to delete list!', savedSongToDelete);
  return { type: ADD_SONG_TO_DELETE_LIST, songsToDelete: [] };
  return (dispatch, getState) => {
    const songsToDelete = getState().queue.queue.splice();
    songsToDelete.push(savedSongToDelete);
    dispatch({
      type: ADD_SONG_TO_DELETE_LIST,
      songsToDelete,
    });
  };
}
