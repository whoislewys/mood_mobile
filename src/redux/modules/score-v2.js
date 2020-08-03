import axios from 'axios';
import firebase from 'react-native-firebase';
import { logEvent } from './analytics';
import { saveSong } from './playlists';
import { getCurrentTrackSelector } from './queue';
import {
  anal,
  CLEAR_SCORE,
  INCREMENT_SCORE,
  SEND_SCORE_SUCCESS,
  SEND_SCORE_FAIL,
} from '../constants';

export const initialState = {
  currentScore: 0,
  error: {},
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, currentScore: action.newScore };
    case CLEAR_SCORE:
      return { ...state, currentScore: 0 };
    case SEND_SCORE_SUCCESS:
      return { ...state };
    case SEND_SCORE_FAIL:
      return { ...state, error: action.e };
    default:
      return state;
  }
}

export function clearScore() {
  return ({ type: CLEAR_SCORE });
}

export function incrementScore(currentScore) {
  return (dispatch, getState) => {
    // if no current track, don't allow the user to rate
    const curTrack = getCurrentTrackSelector(getState());
    if (!curTrack) return;

    if (currentScore === 0) {
      dispatch(saveSong(curTrack));
    }
    dispatch({ type: INCREMENT_SCORE });
  };
}

export function sendScore(currentTrackId) {
  return async (dispatch) => {
    try {
      const token = await firebase.auth()
        .currentUser
        .getIdToken();

      axios.post(`https://api.moodindustries.com/api/v1//songs/${currentTrackId}/star`,
        {
          stars: 1,
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
        { headers: { Authorization: token } });

      dispatch({ type: SEND_SCORE_SUCCESS, currentTrackId });

      // log the send score event
      const eventProperties = { trackId: currentTrackId, starsSent: 1 };
      dispatch(logEvent(anal.songStar, eventProperties));
    } catch (e) {
      dispatch({ type: SEND_SCORE_FAIL, e });
    }
  };
}
