import axios from 'axios';

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
    case INCREMENT_SCORE:
      return { ...state, currentScore: state.currentScore + 1, scoreDelta: state.scoreDelta + 1 };
    case SEND_SCORE:
      console.log(`sending score delta ${state.scoreDelta} to trackId ${action.currentTrackId}`);
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
  return {
    type: INCREMENT_SCORE,
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

export function startScoreTimer() {
  // startScoreTimer() runs only on first song play
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
