import { combineReducers } from 'redux';
import NavigationReducer from './navigation-reducer';
import Mood from './mood-reducer';

export default combineReducers({
  nav: NavigationReducer,
  Mood
});
