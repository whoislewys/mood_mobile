import axios from 'axios';

const RESET_SCORE = 'score/RESET_SCORE';
const INCREMENT_SCORE = 'score/INCREMENT_SCORE';
const SEND_SCORE = 'score/SEND_SCORE';
const START_TIMER = 'score/START_TIMER';
const STOP_TIMER = 'score/STOP_TIMER';

const SEND_SCORE_TIME = 8000; // in ms

const initialState = {
  currentScore: 0,
  scoreDelta: 0,
  timer: null,
  errors: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_SCORE:
      clearInterval(state.timer);
      const newTimer = setInterval(
        () => action.sendScoreDeltaFunc(action.currentTrackId),
        SEND_SCORE_TIME,
      );

      return {
        ...state,
        currentScore: 0,
        scoreDelta: 0,
        timer: newTimer,
      };
    case INCREMENT_SCORE:
      return { ...state, currentScore: state.currentScore + 1, scoreDelta: state.scoreDelta + 1 };
    case SEND_SCORE:
      if (state.scoreDelta > 0) {
        console.log(`sending score delta ${state.scoreDelta} to trackId ${action.currentTrackId}`);
        axios.post(`http://api.moodindustries.com/api/v1//songs/${action.currentTrackId}/star`, { stars: state.scoreDelta, t: 'EXVbAWTqbGFl7BKuqUQv' });
      }

      return { ...state, scoreDelta: 0 };
    case START_TIMER:
      const timer = setInterval(
        () => action.sendScoreDeltaFunc(action.currentTrackId),
        SEND_SCORE_TIME,
      );

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

export function resetScore(sendScoreDeltaFunc, currentTrackId) {
  // called for every star press,
  // updates global score variable
  return {
    type: RESET_SCORE,
    sendScoreDeltaFunc,
    currentTrackId,
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
