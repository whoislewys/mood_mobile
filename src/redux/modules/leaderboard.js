const LOAD_SONGS = 'leaderboard/LOAD';
const LOAD_SONGS_SUCCESS = 'leaderboard/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'leaderboard/LOAD_FAIL';

const initialState = {
  songs: [],
  loading: false,
  error: null,
};

export function mapSongsToValidTrackObjects(list) {
  return list.map(t => ({
    album: t.album_name,
    artist: t.artist,
    artwork: t.art_url,
    id: t.id.toString(),
    mood_id: t.mood_id,
    title: t.name,
    url: t.file,
    stars: t.stars,
  }));
}

// now define reducer
export default function leaderboard(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, loading: true };
    case LOAD_SONGS_SUCCESS:
      const songs = mapSongsToValidTrackObjects(action.payload.data);
      return { ...state, loading: false, songs };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching leaderboard.',
      };
    default:
      return state;
  }
}


export function loadLeaderboardSongs() {
  return {
    type: LOAD_SONGS,
    payload: {
      request: {
        url: '/stats/leaderboard',
        params: {
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
      },
    },
  };
}
