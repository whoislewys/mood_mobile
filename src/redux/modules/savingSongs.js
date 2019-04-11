import axios from 'axios';
import {
  ADD_SONG_TO_DELETED,
  REMOVE_SONG_FROM_DELETED,
  SAVE_SONG,
  SAVE_SONG_SUCCESS,
  SAVE_SONG_FAIL,
} from '../constants';

const initialState = {
  songsToDelete: new Set(),
  loading: '',
  error: '',
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SONG_TO_DELETED:
      // get all the songs from the previous songsToDelete set
      const newSongsToDelete = new Set([action.songToDelete.id]);
      console.log('new deleted set: ', newSongsToDelete);
      console.warn('new deleted set: ', newSongsToDelete);
      // state.songsToDelete.forEach(song => newSongsToDelete.add(song));
      return { ...state, songsToDelete: newSongsToDelete };

    case REMOVE_SONG_FROM_DELETED:
      // get all the songs from the previous songsToDelete set
      const songsToDeleteAfterResaving = new Set();
      state.songsToDelete.forEach(song => songsToDeleteAfterResaving.add(song));

      // remove the one new one
      songsToDeleteAfterResaving.remove(action.songToResave);
      return { ...state, songsToDelete: songsToDeleteAfterResaving };

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
