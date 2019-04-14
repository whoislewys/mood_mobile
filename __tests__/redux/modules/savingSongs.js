import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  reducer,
  initialState as savingSongsInitialState,
  loadSavedSongs,
  saveSong,
  addSongToDeleted, removeSongFromDeleted,
} from '../../../src/redux/modules/savingSongs';
import {
  LOAD_SAVED_SONGS,
  LOAD_SAVED_SONGS_SUCCESS,
  LOAD_SAVED_SONGS_FAIL,
  SAVE_SONG,
  SAVE_SONG_SUCCESS,
  SAVE_SONG_FAIL,
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


describe('SavingSongs module', () => {
  describe('action creator', () => {
    let store;
    describe('loadSavedSongs', () => {
      beforeEach(() => {
        // only mock what you need in the store
        store = mockStore(savingSongsInitialState);
      });

      afterEach(() => {
        store.clearActions();
        jest.clearAllMocks();
      });

      it('should dispatch LOAD_SAVED_SONGS_SUCCESS on success', async () => {
        const mockSongs = [track1, track2];
        axios.get.mockResolvedValue(mockSongs);

        await store.dispatch(loadSavedSongs());

        return expect(store.getActions()).toEqual([
          { type: LOAD_SAVED_SONGS },
          { type: LOAD_SAVED_SONGS_SUCCESS, payload: mockSongs },
        ]);
      });

      it('should dispatch LOAD_SAVED_SONGS_FAIL on fail', async () => {
        axios.get.mockResolvedValue(Promise.reject(new Error('Some API error')));

        await store.dispatch(loadSavedSongs());

        return expect(store.getActions()).toEqual([
          { type: LOAD_SAVED_SONGS },
          { type: LOAD_SAVED_SONGS_FAIL },
        ]);
      });
    });

    describe('saveSong', () => {
      beforeEach(() => {
        // only mock what you need in the store
        store = mockStore(savingSongsInitialState);
      });

      afterEach(() => {
        store.clearActions();
        jest.clearAllMocks();
      });

      it('should dispatch SAVE_SONG_SUCCESS on success', async () => {
        axios.post.mockResolvedValue();
        await store.dispatch(saveSong(track1));
        return expect(store.getActions()).toEqual([
          { type: SAVE_SONG },
          { type: SAVE_SONG_SUCCESS },
        ]);
      });

      it('should dispatch SAVE_SONG_FAIL on failure', async () => {
        const e = new Error('Some API error');
        axios.post.mockResolvedValue(Promise.reject(e));
        await store.dispatch(saveSong(track1));
        return expect(store.getActions()).toEqual([
          { type: SAVE_SONG },
          { type: SAVE_SONG_FAIL, e },
        ]);
      });

      it('should save the song it was passed', async () => {
        axios.post.mockResolvedValue();

        await store.dispatch(saveSong(track1));

        // console.warn('axios post calls: ', axios.post.mock.calls[0][1].song);

        return expect(axios.post.mock.calls[0][1].song).toEqual(track1);
      });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, undefined)).toEqual(savingSongsInitialState);
    });

    it('should add songid to a set when unsaving a song', () => {
      expect(reducer([], addSongToDeleted(track1)))
        .toEqual({
          songIdsToDelete: new Set([track1.id]),
        });
    });

    it('should remove songid to a set when unsaving a song', () => {
      const initState = {
        songIdsToDelete: new Set([track1.id]),
      };
      expect(reducer(initState, removeSongFromDeleted(track1)))
        .toEqual({
          songIdsToDelete: new Set(),
        });
    });

    it('should handle edge case when removing a song when songIdsToDelete is null', () => {
      expect(reducer([], removeSongFromDeleted(track1))).toEqual({});
    });
  });
});
