import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { reducer, initialState as scoreInitialState, incrementScore } from '../../../src/redux/modules/score';
import { initialState as queueInitialState } from '../../../src/redux/modules/queue';
import { INCREMENT_SCORE } from '../../../src/redux/constants';
import * as savingSongs from '../../../src/redux/modules/playlists';

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

describe('Score module', () => {
  describe('action creator', () => {
    describe('incrementScore', () => {
      let store;
      const mockQueueState = queueInitialState;

      // mock the pieces of state you need before calling setup()
      const setup = () => {
        const mockState = {
          queue: mockQueueState,
          score: scoreInitialState,
        };
        store = mockStore(mockState);
      };

      afterEach(() => {
        store.clearActions();
      });

      it('should attempt to save a song if a song has not been starred yet', async () => {
        mockQueueState.curTrack = track1;
        setup();

        const saveSongSpy = jest.spyOn(savingSongs, 'saveSong');

        await store.dispatch(incrementScore());

        expect(saveSongSpy).toHaveBeenCalledTimes(1);

        expect(store.getActions()).toContainEqual({ type: INCREMENT_SCORE });
      });

      it('should increment score if there is no current track', async () => {
        mockQueueState.curTrack = null;
        setup();
        await store.dispatch(incrementScore());
        expect(store.getActions()).toEqual([]);
      });

      it('should increment score, but not save song if the user has already ranked this song', async () => {
        mockQueueState.curTrack = track1;
        scoreInitialState.currentScore = 1;
        setup();
        await store.dispatch(incrementScore());
        expect(store.getActions()).toEqual([{ type: INCREMENT_SCORE }]);
      });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, undefined)).toEqual(scoreInitialState);
    });
  });
});
