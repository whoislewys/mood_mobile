const LOAD_MOODS = 'moods/LOAD';
const LOAD_MOODS_SUCCESS = 'moods/LOAD_SUCCESS';
const LOAD_MOODS_FAIL = 'moods/LOAD_FAIL';
const SET_MOOD = 'moods/SET';

const initialState = {
  moods: [

  ],
  selected_mood: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MOOD:
      let newMood = { selected_mood: action.mood }
      return { ...state, ...newMood };
    default:
      return state;
  }
}

export function setMood(mood_id) {

}

export function loadMoods() {
  
}
