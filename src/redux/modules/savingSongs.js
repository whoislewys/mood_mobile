import axios from 'axios';

const SAVE_SONG = 'savingsongs/CREATE_PLAYLIST';
const SAVE_SONG_SUCCESS = 'savingsongs/CREATE_PLAYLIST_SUCCESS';
const SAVE_SONG_FAIL = 'savingsongs/CREATE_PLAYLIST_FAIL';

const initialState = {
  loading: '',
  error: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
    dispatch({ SAVE_SONG });
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