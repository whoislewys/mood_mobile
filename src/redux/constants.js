/** Redux Constants **/
// Anal
export const LOG_EVENT = 'ANAL/LOG_EVENT';
export const SET_DEVICE_INFO = 'ANAL/SET_DEVICE_INFO';
export const SET_USER_ID = 'ANAL/SET_USER_ID';
export const API_KEY = 'c1bb5c361a35b3978494ded3f756fb65';

// Auth
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

// Events
export const LOAD_EVENTS = 'events/LOAD';
export const LOAD_EVENTS_SUCCESS = 'events/LOAD_SUCCESS';
export const LOAD_EVENTS_FAILURE = 'events/LOAD_FAILURE';
export const EVENT_CAL_ID = 'ghd4v0jfbsr5hjoe3isfjtt62s@group.calendar.google.com';
export const GOOGLE_API_KEY = 'AIzaSyBBpspRcmIZc9XqVj3Xk6r227t1s02nnuQ';

// Leaderboard
export const LEADERBOARD_LOAD_SONGS = 'leaderboard/LOAD';
export const LEADERBOARD_LOAD_SONGS_SUCCESS = 'leaderboard/LOAD_SUCCESS';
export const LEADERBOARD_LOAD_SONGS_FAIL = 'leaderboard/LOAD_FAIL';

// Mood
export const LOAD_MOODS = 'moods/LOAD';
export const LOAD_MOODS_SUCCESS = 'moods/LOAD_SUCCESS';
export const LOAD_MOODS_FAIL = 'moods/LOAD_FAIL';
export const SET_MOOD = 'moods/SET';

// Playlists
export const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST';
export const CREATE_PLAYLIST_SUCCESS = 'playlists/CREATE_PLAYLIST_SUCCESS';
export const CREATE_PLAYLIST_FAIL = 'playlists/CREATE_PLAYLIST_FAIL';
export const LOAD_PLAYLISTS = 'playlists/LOAD';
export const LOAD_PLAYLISTS_SUCCESS = 'playlists/LOAD_SUCCESS';
export const LOAD_PLAYLISTS_FAIL = 'playlists/LOAD_FAIL';
export const OPEN_MODAL = 'playlists/OPEN_MODAL';
export const CLOSE_MODAL = 'playlists/CLOSE_MODAL';
export const UPDATE_NEW_PLAYLIST_NAME = 'playlists/UPDATE_NEW_PLAYLIST_NAME';

// Queue
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
export const PLAY_SHUFFLED_PLAYLIST = 'queue/SHUFFLE';
export const MOOD_TYPE = 'mood';
export const LEADERBOARD_TYPE = 'leaderboard';

// Saving
export const SAVE_SONG = 'savingSongs/SAVE_SONG';
export const SAVE_SONG_SUCCESS = 'savingSongs/SAVE_SONG_SUCCESS';
export const SAVE_SONG_FAIL = 'savingSongs/SAVE_SONG_FAIL';

// Score
export const INCREMENT_SCORE = 'score/INCREMENT_SCORE';
export const SEND_SCORE = 'score/SEND_SCORE';
export const START_TIMER = 'score/START_TIMER';
export const STOP_TIMER = 'score/STOP_TIMER';

// Settings
export const DATA_TRACK_TOGGLE = 'settings/DATA_TRACK_TOGGLE';

/** Other Constants **/
// Analytics events
export const anal = {
  songShare: 'Song Share',
  songStar: 'Song Star',
  songPlay: 'Song Play',
  appOpen: 'App Open',
  deepLinkOpen: 'Deep Link Open',
};
