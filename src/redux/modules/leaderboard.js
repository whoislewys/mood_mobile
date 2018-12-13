const LOAD_SONGS = 'leaderboard/LOAD';

const initialState = {
  leaderboardSongs: [],
};

// now define reducer
export default function leaderboard(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SONGS:
      const leaderboardSongs = action.payload.leaderboardSongs;
      return { ...state, leaderboardSongs };
    default:
      return state;
  }
}


export function loadLeaderboardSongs() {
  // TODO @Sam: replace these hardcoded tracks with an api call
  const track = {
    id: 69,
    file: 'http://example.com/avaritia.mp3',
    name: 'Avaritia',
    artist: 'deadmau5',
    album_name: 'while(1<2)',
    art_url: 'http://example.com/avaritia.png',
    mood_id: 3,
  };
  const track2 = {
    id: 127,
    file: 'https://production-test-songs.s3.amazonaws.com/songs/files/000/000/127/original/song165.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHMBOKA2QJ7MVUIA%2F20181110%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20181110T000117Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=207f271efcd1a1ce2cb1398a443e1313ee64d150837283b3514cb36c2adf2bbf',
    name: 'Really Love',
    artist: 'Dawson bailey',
    album_name: '',
    art_url: 'https://i1.sndcdn.com/artworks-000306722370-p33yx5-t500x500.jpg',
    mood_id: 1,
  };
  return {
    type: LOAD_SONGS,
    payload: { leaderboardSongs: [track, track2] },
  };
}
