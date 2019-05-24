import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  reducer,
  initialState as queueInitialState,
  loadSongsForMoodId,
  loadQueueStartingAtId,
} from '../../../src/redux/modules/queue';
import { initialState as leaderboardInitialState } from '../../../src/redux/modules/leaderboard';
import { initialState as scoreInitialState } from '../../../src/redux/modules/score';
import {
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_FAIL,
  LOAD_QUEUE_STARTING_AT_ID,
  RESET_QUEUE,
} from '../../../src/redux/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const track1 = {
  id: 69,
  file: 'https://mood-music-api.herokuapp.com//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBblVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e2afd16bbd89ed4503d3f60a362a6ddd263992fc/songs167.mp3',
  name: 'Coffee (prod. KRVSH)',
  artist: 'Isaac Von',
  album_name: 'while(1<2)',
  art_url: 'https://i1.sndcdn.com/artworks-000232798771-b7p886-t500x500.jpg',
  mood_id: 3,
  stars: 100,
  rank: 1,
};
const track2 = {
  id: 127,
  file: 'https://mood-music-api.herokuapp.com//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--38b288068b793cb2590e021c2d263afa289a7f2a/song73.mp3',
  name: 'Really Love',
  artist: 'Dawson bailey',
  album_name: '',
  art_url: 'https://i1.sndcdn.com/artworks-000306722370-p33yx5-t500x500.jpg',
  mood_id: 1,
  stars: 76,
  rank: 2,
};

describe('Queue module', () => {
  describe('action creator', () => {
    describe('loadSongsForMoodId', () => {
      let store;
      beforeEach(() => {
        // only mock what you need in the store
        store = mockStore({ queue: queueInitialState, score: scoreInitialState });
      });

      afterEach(() => {
        store.clearActions();
      });

      it('should dispatch LOAD_SONGS_SUCCESS on success', async () => {
        // Arrange
        const mockSongs = [track1, track2];
        axios.get.mockResolvedValue(mockSongs);

        // Act
        await store.dispatch(loadSongsForMoodId(1));
        // Assert
        expect(store.getActions()).toContainEqual({ type: LOAD_SONGS });
        expect(store.getActions()).toContainEqual({ type: LOAD_SONGS_SUCCESS, payload: mockSongs });
      });

      it('should dispatch LOAD_SONGS_FAIL on fail', async () => {
        // mimic a failed api call
        axios.get.mockResolvedValue(Promise.reject(new Error('Some API error')));
        await store.dispatch(loadSongsForMoodId(1));
        return expect(store.getActions()).toEqual([
          { type: LOAD_SONGS },
          { type: LOAD_SONGS_FAIL },
        ]);
      });
    });

    describe('loadLeaderboardSongs', () => {
      let mockState;
      let store;

      beforeEach(() => {
        // only mock what you need in the store
        leaderboardInitialState.songs = [track1, track2];
        mockState = {
          leaderboard: leaderboardInitialState,
          score: scoreInitialState,
        };
        store = mockStore(mockState);
      });

      afterEach(() => {
        store.clearActions();
      });

      it('should dispatch correct queue actions', async () => {
        const selectedLeaderboardSongIndex = 1;
        await store.dispatch(loadQueueStartingAtId(selectedLeaderboardSongIndex, [track1, track2]));
        return expect(store.getActions().slice(0, 2)).toEqual([
          { type: RESET_QUEUE },
          {
            type: LOAD_QUEUE_STARTING_AT_ID,
            startSongIndex: selectedLeaderboardSongIndex,
            songs: mockState.leaderboard.songs,
          },
        ]);
      });
    });

    describe('loadSharedSongQueue', async () => {
      // TODO: this is left as an exercise to the reader
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, undefined)).toEqual(queueInitialState);
    });
    it('should handle RESET_QUEUE action', () => {
      expect(reducer([], { type: RESET_QUEUE })).toEqual({
        loading: true,
        queue: [],
        curTrack: null,
        curTrackIndex: NaN,
        track: null,
        queueType: '',
      });
    });
    // TODO: test the other actions...
  });
});
