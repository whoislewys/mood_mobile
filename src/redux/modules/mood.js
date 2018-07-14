import { Image } from 'react-native';

const LOAD_MOODS = 'moods/LOAD';
const LOAD_MOODS_SUCCESS = 'moods/LOAD_SUCCESS';
const LOAD_MOODS_FAIL = 'moods/LOAD_FAIL';
const SET_MOOD = 'moods/SET';

const initialState = {
  moods: [

  ],
  selected: null,
  loading: false,
  error: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_MOODS:
      return { ...state, loading: true };
    case LOAD_MOODS_SUCCESS:
      let data = action.payload.data;
      data = Object.keys(data).map(function (key) { return data[key]; });
      preloadImages(data);

      return {
        ...state,
        loading: false,
        moods: data
      };
    case LOAD_MOODS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching moods.'
      };
    case SET_MOOD:
      let newMood = { selected: action.mood }
      return { ...state, ...newMood };
    default:
      return state;
  }
}

export function setMood(index) {
  return {
    type: SET_MOOD,
    mood: index
  }
}

export function loadMoods() {
  return {
    type: LOAD_MOODS,
    payload: {
      request:{
        url:'/moods',
        params: {
          t: 'EXVbAWTqbGFl7BKuqUQv'
        }
      }
    }
  }
}

export async function preloadImages(list) {
  var imagePrefetch = [];
  for (let mood of list) {
      imagePrefetch.push(Image.prefetch(mood.file));
  }

  await Promise.all(imagePrefetch);
}
