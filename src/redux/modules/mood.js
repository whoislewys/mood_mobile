import axios from 'axios';
import {
  LOAD_MOODS,
  LOAD_MOODS_SUCCESS,
  LOAD_MOODS_FAIL,
  SET_MOOD,
} from '../constants';

const initialState = {
  moods: [

  ],
  selected: null,
  loading: false,
  error: null,
};

// export async function preloadImages(list) {
//   const imagePrefetch = [];
//   for (let i = 0; i < list.length; i++) {
//     const mood = list[i];
//     imagePrefetch.push(Image.prefetch(mood.file));
//   }
//   await Promise.all(imagePrefetch);
// }

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_MOODS:
      return { ...state, loading: true };
    case LOAD_MOODS_SUCCESS:
      let data = action.payload.data;
      data = Object.keys(data).map(key => data[key]);
      // preloadImages(data);
      return {
        ...state,
        loading: false,
        moods: data,
      };
    case LOAD_MOODS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching moods.',
      };
    case SET_MOOD:
      const newMood = { selected: action.mood };
      return { ...state, ...newMood };
    default:
      return state;
  }
}

export function setMood(moodObj) {
  return {
    type: SET_MOOD,
    mood: moodObj,
  };
}

// export function loadMoods() {
//   return {
//     type: LOAD_MOODS,
//     payload: {
//       request: {
//         url: '/moods',
//         params: {
//           t: 'EXVbAWTqbGFl7BKuqUQv',
//         },
//       },
//     },
//   };
// }

// export function loadMoods() {
//   return async (dispatch) => {
//     dispatch({ type: LOAD_MOODS });
//     let queuePromise = axios.get(`https://api.moodindustries.com/api/v1/moods/`,
//       {
//         params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
//         responseType: 'json',
//       });
//     try {
//       let moods = await queuePromise;
//       dispatch({ type: LOAD_MOODS_SUCCESS, payload: moods });
//     } catch (e) {
//       dispatch({ type: LOAD_MOODS_FAIL });
//     }
//   };
// }

export function loadMoods() {
  return async (dispatch) => {
    dispatch({ type: LOAD_MOODS });
    return axios.get('https://api.moodindustries.com/api/v1/moods/',
      {
        params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
        responseType: 'json',
      }).then(
      moods => dispatch({ type: LOAD_MOODS_SUCCESS, payload: moods }),
      error => dispatch({ type: LOAD_MOODS_FAIL, error }),
    );
  };
}
