import { combineReducers } from 'redux';
import { reducer as analytics } from './analytics';
import { reducer as auth } from './auth';
import { reducer as events } from './events';
import { reducer as leaderboard } from './leaderboard';
import { reducer as playlists } from './playlists';
import { reducer as queue } from './queue';
import { reducer as savingSongs } from './savingSongs';
import { reducer as score } from './score';
import { reducer as settings } from './settings';
import { reducer as mood } from './mood';

export default combineReducers({
  analytics,
  auth,
  events,
  leaderboard,
  queue,
  playlists,
  savingSongs,
  score,
  settings,
  mood,
});
