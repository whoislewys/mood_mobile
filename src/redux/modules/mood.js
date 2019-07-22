import axios from 'axios';
import {
  LOAD_MOODS,
  LOAD_MOODS_SUCCESS,
  LOAD_MOODS_FAIL,
  SET_MOOD,
  LOAD_FEATURED_SUCCESS,
  LOAD_FEATURED_FAIL,
} from '../constants';
import { mapSongsToValidTrackObjects } from '../util';
import Images from '@assets/images';

const initialState = {
  moods: [

  ],
  featuredSong: {},
  selected: null,
  loading: false,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_MOODS:
      return { ...state, loading: true };
    case LOAD_MOODS_SUCCESS:
      const { data: moods } = action.payload;
      moods.forEach((mood) => {
        if (mood.id === 1) {
          mood.file = Images.happyTile;
          mood.name = 'Happy';
        } else if (mood.id === 2) {
          mood.file = Images.angryTile;
          mood.name = 'Angry';
        } else if (mood.id === 3) {
          mood.file = Images.romanticTile;
          mood.name = 'Romantic';
        } else if (mood.id === 5) {
          mood.file = Images.sadTile;
          mood.name = 'Sad';
        } else {
          console.warn('unexpected mood');
        }
      });
      return {
        ...state,
        loading: false,
        moods,
      };
    case LOAD_MOODS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching moods.',
      };

    case LOAD_FEATURED_SUCCESS:
      return { ...state, featuredSong: mapSongsToValidTrackObjects([action.featuredResp.data])[0] };
    case LOAD_FEATURED_FAIL:
      return { ...state, featuredSong: {}, error: action.e };

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

export function loadFeaturedSong() {
  return async (dispatch) => {
    try {
      const featuredResp = await axios.get('https://api.moodindustries.com/api/v1/featured',
        {
          params: { t: 'EXVbAWTqbGFl7BKuqUQv' },
        });
      dispatch({ type: LOAD_FEATURED_SUCCESS, featuredResp });
    } catch (e) {
      dispatch({ type: LOAD_FEATURED_FAIL, e });
    }
  };
}
