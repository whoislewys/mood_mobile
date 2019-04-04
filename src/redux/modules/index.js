import { combineReducers } from 'redux';
import analytics from './analytics';
import auth from './auth';
import events from './events';
import leaderboard from './leaderboard';
import queue from './queue';
import score from './score';
import settings from './settings';
import mood from './mood';

export default combineReducers({
  analytics,
  auth,
  events,
  leaderboard,
  queue,
  score,
  settings,
  mood,
});
