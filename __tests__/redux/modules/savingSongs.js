import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  reducer,
  initialState as savingSongsInitialState,
  saveSong,
  addSongToDeleted,
  removeSongFromDeleted,
  loadSavedSongs,
} from '../../../src/redux/modules/playlists';
import { initialState as queueInitialState } from '../../../src/redux/modules/queue';
import { initialState as authInitialState } from '../../../src/redux/modules/auth';
import {
  LOAD_SAVED_SONGS,
  LOAD_SAVED_SONGS_SUCCESS,
  LOAD_SAVED_SONGS_FAIL,
  SAVE_RANKED_SONG,
  SAVE_RANKED_SONG_SUCCESS,
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
    describe('saveSong', () => {
      beforeEach(() => {
        queueInitialState.curPlaylistId = 1;
        authInitialState.uid = 69;
        const mockState = {
          auth: authInitialState,
          savingSongs: savingSongsInitialState,
          queue: queueInitialState,
        };
        store = mockStore(mockState);
      });

      afterEach(() => {
        store.clearActions();
        jest.clearAllMocks();
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
