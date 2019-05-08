import axios from 'axios';
import {
  LEADERBOARD_LOAD_SONGS as LOAD_SONGS,
  LEADERBOARD_LOAD_SONGS_SUCCESS as LOAD_SONGS_SUCCESS,
  LEADERBOARD_LOAD_SONGS_FAIL as LOAD_SONGS_FAIL,
} from '../constants';

export const initialState = {
  songs: [],
  loading: false,
  error: null,
};

export function mapSongsToValidTrackObjects(list) {
  return list.map(t => ({
    album: t.album_name,
    artist: t.artist,
    artwork: t.art_url,
    id: t.id.toString(),
    mood_id: t.mood_id,
    title: t.name,
    url: t.file,
    stars: t.stars,
  }));
}

// now define reducer
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true };
    case LOAD_SONGS_SUCCESS:
      const songs = mapSongsToValidTrackObjects(action.payload.data);
      return { ...state, loading: false, songs };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching leaderboard.',
      };
    default:
      return state;
  }
}

export function loadLeaderboardSongs() {
  return async (dispatch) => {
    dispatch({ type: LOAD_SONGS });
    try {
      let songs = await axios.get('https://api.moodindustries.com/api/v1/stats/leaderboard',
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
          responseType: 'json',
        });
      dispatch({ type: LOAD_SONGS_SUCCESS, payload: songs });
    } catch (e) {
      dispatch({ type: LOAD_SONGS_FAIL });
    }
  };
}
