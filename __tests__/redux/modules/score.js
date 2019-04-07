import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('axios');

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
