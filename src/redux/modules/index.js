import { combineReducers } from 'redux';

import mood from './mood';
import queue from './queue';

export default combineReducers({
  mood,
  queue,
});
