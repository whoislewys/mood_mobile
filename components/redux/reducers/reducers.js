import { combineReducers } from 'redux';
import navigationReducer from './navigation-reducer';

export default combineReducers({
  nav: navigationReducer
});
