// import { Image } from 'react-native';

const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
};

export function loadSongData(list) {
  // const songPrefetch = [];
  // for (let i = 0; i < list.length; i++) {
  //   const song = list[i];
  //   songPrefetch.push(Image.prefetch(song.art_url));
  // }

  // await Promise.all(songPrefetch);

  return list.map(t => ({
    id: t.id.toString(),
    url: t.file,
    title: t.name,
    artist: t.artist,
    album: t.album_name,
    artwork: t.art_url,
    mood_id: t.mood_id,
  }));

  // const track = {
  //   id: 'unique track id',
  //
  //   url: 'http://example.com/avaritia.mp3', // Load media from the network
  //
  //   title: 'Avaritia',
  //   artist: 'deadmau5',
  //   album: 'while(1<2)',
  //
  //   artwork: 'http://example.com/avaritia.png', // Load artwork from the network
  // };
  //
  // const track2 = {
  //   id: 127,
  //   name: 'Really Love',
  //   artist: 'Dawson bailey',
  //   album_name: '',
  //   art_url: 'https://i1.sndcdn.com/artworks-000306722370-p33yx5-t500x500.jpg',
  //   file: 'https://production-test-songs.s3.amazonaws.com/songs/files/000/000/127/original/song165.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHMBOKA2QJ7MVUIA%2F20181110%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20181110T000117Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=207f271efcd1a1ce2cb1398a443e1313ee64d150837283b3514cb36c2adf2bbf',
  //   mood_id: 1,
  // };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true, queue: [] };
    case LOAD_SONGS_SUCCESS:
      let songs = null;
      songs = loadSongData(action.payload.data);
      return { ...state, loading: false, queue: songs };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };
    case PLAYBACK_STATE:
      return {
        ...state,
        playback: action.state,
      };
    case PLAYBACK_TRACK:
      return {
        ...state,
        track: action.track,
      };
    default:
      return state;
  }
}

export function loadSongsForMoodId(moodId) {
  return {
    type: LOAD_SONGS,
    payload: {
      request: {
        url: `/moods/${moodId}/songs`,
        params: {
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
      },
    },
  };
}

export function playbackState(state) {
  return {
    type: PLAYBACK_STATE,
    state,
  };
}

export function playbackTrack(track) {
  return {
    type: PLAYBACK_TRACK,
    track,
  };
}
