import { combineReducers } from 'redux';
import analytics from './analytics';
import auth from './auth';
import events from './events';
import leaderboard from './leaderboard';
import playlists from './playlists';
import queue from './queue';
import score from './score';
import settings from './settings';
import mood from './mood';
import savingSongs from './savingSongs';

export default combineReducers({
  analytics,
  auth,
  events,
  leaderboard,
  queue,
  playlists,
  score,
  settings,
  mood,
  savingSongs,
});
