import { combineReducers } from 'redux';
import mood from './mood';
import queue from './queue';
import leaderboard from './leaderboard';
import events from './events';
import score from './score';
import analytics from './analytics';

export default combineReducers({
  mood,
  queue,
  leaderboard,
  events,
  score,
  analytics,
});
