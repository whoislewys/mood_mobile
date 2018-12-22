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
    file: 'https://production-test-songs.s3.amazonaws.com/songs/files/000/000/078/original/song67.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHMBOKA2QJ7MVUIA%2F20181215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20181215T025257Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=2009e8c66bdd68a1bffc9c3e576d7c006caf3033738eb65773fd0b9744522eeb',
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
    file: 'https://production-test-songs.s3.amazonaws.com/songs/files/000/000/127/original/song165.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHMBOKA2QJ7MVUIA%2F20181110%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20181110T000117Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=207f271efcd1a1ce2cb1398a443e1313ee64d150837283b3514cb36c2adf2bbf',
    name: 'Really Love',
    artist: 'Dawson bailey',
    album_name: '',
    art_url: 'https://i1.sndcdn.com/artworks-000306722370-p33yx5-t500x500.jpg',
    mood_id: 1,
    stars: 76,
    rank: 2,
  };
  return {
    type: LOAD_SONGS,
    payload: { leaderboardSongs: [track, track2] },
  };
}
