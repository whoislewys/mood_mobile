import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  initialState,
  loadSongsForMoodId,
  loadLeaderboardSongQueue,
  loadSharedSongQueue,
} from '../../../src/redux/modules/queue';
import { initialState as leaderboardInitialState } from '../../../src/redux/modules/leaderboard';
import { initialState as scoreInitialState } from '../../../src/redux/modules/score';
import {
  anal,
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_FAIL,
  LOAD_SHARED_SONG_QUEUE,
  LOAD_SHARED_SONG_QUEUE_SUCCESS,
  LOAD_SHARED_SONG_QUEUE_FAIL,
  LOAD_LEADERBOARD_SONG_QUEUE,
  RESET_QUEUE,
  PLAYBACK_STATE,
  PLAYBACK_TRACK,
  MOOD_TYPE,
  LEADERBOARD_TYPE,
} from '../../../src/redux/constants';

jest.mock('axios');
