import axios from 'axios';
import { logEvent } from './analytics';
import { saveSong } from './savingSongs';
import {
  anal,
  INCREMENT_SCORE,
  SEND_SCORE,
  START_TIMER,
  STOP_TIMER,
} from '../constants';

const SEND_SCORE_TIME = 8000; // in ms

export const initialState = {
  currentScore: 0,
  scoreDelta: 0,
  timer: null,
  errors: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, currentScore: state.currentScore + 1, scoreDelta: state.scoreDelta + 1 };
    case SEND_SCORE:
      // DEBUG:
      // console.log(`sending score delta ${state.scoreDelta} to trackId ${action.currentTrackId}`);
      if (state.scoreDelta > 0) {
        axios.post(`http://api.moodindustries.com/api/v1//songs/${action.currentTrackId}/star`, { stars: state.scoreDelta, t: 'EXVbAWTqbGFl7BKuqUQv' });
      }
      return { ...state, scoreDelta: 0 };
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
  // called for every star press,
  // updates global score variable
  return (dispatch, getState) => {
    if (getState().score.currentScore === 0) {
      dispatch(saveSong());
    }
    dispatch({ type: INCREMENT_SCORE });
  };
}

export function sendScoreDelta(currentTrackId) {
  // sends change in score (scoreDelta) to api
  return (dispatch, getState) => {
    // don't waste user's data if their score hasn't changed
    if (getState().score.scoreDelta > 0) {
      const eventProperties = { trackId: currentTrackId, starsSent: getState().score.scoreDelta };
      dispatch(logEvent(anal.songStar, eventProperties));
      dispatch({ type: SEND_SCORE, currentTrackId });
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
