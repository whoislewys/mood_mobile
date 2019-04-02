/** Redux Constants **/
// Queue Constants
export const LOAD_SONGS = 'queue/LOAD';
export const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
export const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';
export const LOAD_SHARED_SONG_QUEUE = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD';
export const LOAD_SHARED_SONG_QUEUE_SUCCESS = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_SUCCESS';
export const LOAD_SHARED_SONG_QUEUE_FAIL = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_FAIL';
export const LOAD_LEADERBOARD_SONG_QUEUE = 'queue/LOAD_LEADERBOARD_SONG_QUEUE';
export const RESET_QUEUE = 'queue/RESET_QUEUE';
export const PLAYBACK_STATE = 'playback/STATE';
export const PLAYBACK_TRACK = 'playback/TRACK';
// Queue types
export const MOOD_TYPE = 'mood';
export const LEADERBOARD_TYPE = 'leaderboard';

// TODO: add more redux constants here

/** Other Constants **/
// Analytics events
export const anal = {
  songShare: 'Song Share',
  songStar: 'Song Star',
  songPlay: 'Song Play',
  appOpen: 'App Open',
  deepLinkOpen: 'Deep Link Open',
};
