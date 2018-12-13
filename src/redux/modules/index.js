import { combineReducers } from 'redux';
import mood from './mood';
import queue from './queue';
import leaderboard from './leaderboard';

export default combineReducers({
  mood,
  queue,
  leaderboard,
});
