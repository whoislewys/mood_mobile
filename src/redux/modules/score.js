import axios from 'axios';

const RESET_SCORE = 'score/RESET_SCORE';
const INCREMENT_SCORE = 'score/INCREMENT_SCORE';
const UPDATE_SCORE_DELTA = 'score/UPDATE_SCORE_DELTA';
const SEND_SCORE = 'score/SEND_SCORE';
const START_TIMER = 'score/START_TIMER';
const STOP_TIMER = 'score/STOP_TIMER';

const SEND_SCORE_TIME = 8000; // in ms

const initialState = {
  currentScore: 0,
  scoreDelta: 0,
  timer: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_SCORE:
      return { ...state, currentScore: 0, scoreDelta: 0 };
    case INCREMENT_SCORE:
      return { ...state, currentScore: state.currentScore + 1 };
    case UPDATE_SCORE_DELTA:
      return { ...state, scoreDelta: state.scoreDelta + 1 };
    case SEND_SCORE:
      console.log(`sending score delta ${state.scoreDelta} to trackId ${action.currentTrackId}`);
      // TODO:  ^ replace with POST call to api ^
      return { ...state, scoreDelta: 0 };
    case START_TIMER:
      const timer = setInterval(() => action.sendScoreDeltaFunc(action.currentTrackId), SEND_SCORE_TIME);
      return { ...state, timer };
    case STOP_TIMER:
      clearInterval(state.timer);
      return state;
    default:
      return state;
  }
}

export function incrementScore() {
  // called for every star press,
  // updates global score variable
  return {
    type: INCREMENT_SCORE,
  };
}

export function resetScore() {
  // called for every star press,
  // updates global score variable
  return {
    type: RESET_SCORE,
  };
}

export function incrementScoreDelta() {
  // similar to update score, only this will always update by one in the action
  // so no argument is needed
  return {
    type: UPDATE_SCORE_DELTA,
  };
}

export function sendScoreDelta(currentTrackId) {
  // sends change in score (scoreDelta) to api,
  // then resets scoreDelta to 0
  // this should be called (therefore score changes should be pushed) repeatedly
  // by the timer defined above
  return {
    type: SEND_SCORE,
    currentTrackId,
  };
}

export function startScoreTimer(sendScoreDeltaFunc, currentTrackId) {
  return {
    type: START_TIMER,
    sendScoreDeltaFunc,
    currentTrackId,
  };
}

export function stopScoreTimer() {
  return {
    type: STOP_TIMER,
  };
}
