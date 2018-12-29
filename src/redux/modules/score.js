import axios from 'axios';

const UPDATE_SCORE = 'score/UPDATE_SCORE';
const SEND_SCORE = 'score/SEND_SCORE';

const initialState = {
  currentScore: 0,
  scoreDelta: 0,
  timer: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SCORE:
      return { ...state, currentScore: action.newScore };
    case SEND_SCORE:
      console.log('sending scoredelta: ', action.scoreDelta);
      // reset timer
      return { ...state, scoreDelta: 0 };
    default:
      return state;
  }
}

export function updateScore(newScore) {
  return {
    type: UPDATE_SCORE,
    newScore,
  };
}

export function sendScoreDelta(scoreDelta) {
  return {
    type: SEND_SCORE,
    scoreDelta,
  };
}
