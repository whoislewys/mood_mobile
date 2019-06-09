import axios from 'axios';
import firebase from 'react-native-firebase';
import { logEvent } from './analytics';
import { saveSong } from './playlists';
import {
  anal,
  INCREMENT_SCORE,
  SEND_SCORE_SUCCESS,
  SEND_SCORE_FAIL,
  START_TIMER,
  STOP_TIMER,
} from '../constants';

const SEND_SCORE_TIME = 8000; // in ms

export const initialState = {
  currentScore: 0,
  scoreDelta: 0,
  timer: null,
  error: {},
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, currentScore: state.currentScore + 1, scoreDelta: state.scoreDelta + 1 };
    case SEND_SCORE_SUCCESS:
      return { ...state, scoreDelta: 0 };
    case SEND_SCORE_FAIL:
      return { ...state, scoreDelta: 0, error: action.e };
    case START_TIMER:
      return {
        ...state,
        currentScore: 0,
        scoreDelta: 0,
        timer: action.newTimer,
      };
    case STOP_TIMER:
      return { ...state, timer: null };
    default:
      return state;
  }
}

export function incrementScore() {
  return (dispatch, getState) => {
    // if no current track, don't allow the user to rate
    const { curTrack } = getState().queue;
    if (!curTrack) return;

    if (getState().score.currentScore === 0) {
      dispatch(saveSong(curTrack));
    }
    dispatch({ type: INCREMENT_SCORE });
  };
}

export function sendScoreDelta(currentTrackId) {
  // sends change in score (scoreDelta) to api
  return async (dispatch, getState) => {
    // don't waste user's data if their score hasn't changed
    const { scoreDelta } = getState().score;
    if (scoreDelta > 0) {
      const eventProperties = { trackId: currentTrackId, starsSent: getState().score.scoreDelta };
      dispatch(logEvent(anal.songStar, eventProperties));
      try {
        const token = await firebase.auth()
          .currentUser
          .getIdToken();

        axios.post(`https://api.moodindustries.com/api/v1//songs/${currentTrackId}/star`,
          {
            stars: scoreDelta,
            t: 'EXVbAWTqbGFl7BKuqUQv',
          },
          { headers: { Authorization: token } });

        dispatch({ type: SEND_SCORE_SUCCESS, currentTrackId });
      } catch (e) {
        dispatch({ type: SEND_SCORE_FAIL, e });
      }
    }
  };
}

export function startScoreTimer() {
  return (dispatch, getState) => {
    clearInterval(getState().score.timer);
    const newTimer = setInterval(() => dispatch(sendScoreDelta(getState().queue.curTrack.id)), SEND_SCORE_TIME);
    dispatch({
      type: START_TIMER,
      newTimer,
    });
  };
}

export function stopScoreTimer() {
  // THIS ACTION SHOULD ONLY BE CALLED WHEN APP UNMOUNTS
  return (dispatch, getState) => {
    clearInterval(getState().score.timer);
    dispatch({
      type: STOP_TIMER,
    });
  };
}
