import axios from 'axios';
import {
  LEADERBOARD_LOAD_SONGS as LOAD_SONGS,
  LEADERBOARD_LOAD_SONGS_SUCCESS as LOAD_SONGS_SUCCESS,
  LEADERBOARD_LOAD_SONGS_FAIL as LOAD_SONGS_FAIL,
} from '../constants';
import { mapSongsToValidTrackObjects } from '../util';

export const initialState = {
  songs: [],
  loading: false,
  error: null,
};

// now define reducer
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, songs: [], loading: true };
    case LOAD_SONGS_SUCCESS:
      const songs = mapSongsToValidTrackObjects(action.payload.data);
      return { ...state, loading: false, songs };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.e,
      };
    default:
      return state;
  }
}

export function loadLeaderboardSongs(leaderboardType) {
  return async (dispatch) => {
    dispatch({ type: LOAD_SONGS });
    try {
      const url = `https://api.moodindustries.com/api/v1/stats/${leaderboardType}`;
      const songs = await axios.get(url,
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SONGS_SUCCESS, payload: songs });
    } catch (e) {
      dispatch({ type: LOAD_SONGS_FAIL, e });
    }
  };
}
