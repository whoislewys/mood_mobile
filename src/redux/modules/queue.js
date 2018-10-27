const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
};

export async function loadSongData(list) {
  // const songPrefetch = [];
  // for (let i = 0; i < list.length; i++) {
  //   const song = list[i];
  //   songPrefetch.push(Image.prefetch(mood.file));
  // }
  //
  // await Promise.all(imagePrefetch);

  return list;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true };
    case LOAD_SONGS_SUCCESS:
      let data = action.payload.data;
      data = Object.keys(data).map(key => data[key]);
      data = loadSongData(data);

      return {
        ...state,
        loading: false,
        queue: data,
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };
    default:
      return state;
  }
}

export function loadSongsForMood(mood) {
  return {
    type: LOAD_SONGS,
    payload: {
      request: {
        url: `/moods/${mood}/songs`,
        params: {
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
      },
    },
  };
}
