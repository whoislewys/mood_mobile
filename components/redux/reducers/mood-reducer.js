import { SET_MOOD } from '../actions/index';

const initialState = {
  moods: [

  ],
  selected_mood: null
}

export default function moods(state = initialState, action) {
  switch (action.type) {
    case SET_MOOD:
      let newMood = { selected_mood: action.mood }
      return { ...state, ...newMood };
    default:
      return state;
  }
}
