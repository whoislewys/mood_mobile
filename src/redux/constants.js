/** Redux Constants * */
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

export const LEADERBOARDS = {
  'All Time': 'leaderboard',
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly',
};

// Mood
export const LOAD_MOODS = 'moods/LOAD';
export const LOAD_MOODS_SUCCESS = 'moods/LOAD_SUCCESS';
export const LOAD_MOODS_FAIL = 'moods/LOAD_FAIL';
export const LOAD_FEATURED_SUCCESS = 'tiles/LOAD_FEATURED_SUCCESS';
export const LOAD_FEATURED_FAIL = 'tiles/LOAD_FEATURED_SUCCESS';
export const SET_MOOD = 'moods/SET';
export const tileConstants = {
  MYSTERY: 69,
  FEATURED_SONG: 99,
};

// Playlists
// C
export const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST';
export const CREATE_PLAYLIST_SUCCESS = 'playlists/CREATE_PLAYLIST_SUCCESS';
export const CREATE_PLAYLIST_FAIL = 'playlists/CREATE_PLAYLIST_FAIL';
// R
export const LOAD_PLAYLISTS = 'playlists/LOAD';
export const LOAD_PLAYLISTS_SUCCESS = 'playlists/LOAD_PLAYLISTS_SUCCESS';
export const LOAD_PLAYLISTS_FAIL = 'playlists/LOAD_PLAYLISTS_FAIL';
export const PLAYLIST_LOAD_SONGS = 'playlists/LOAD_SONGS';
export const PLAYLIST_LOAD_SONGS_SUCCESS = 'playlists/LOAD_SONGS_SUCCESS';
export const PLAYLIST_LOAD_SONGS_FAIL = 'playlists/LOAD_SONGS_FAIL';
// U
export const UPDATE_PLAYLIST = 'playlists/UPDATE';
export const UPDATE_PLAYLIST_SUCCESS = 'playlists/UPDATE_SUCCESS';
export const UPDATE_PLAYLIST_FAIL = 'playlists/UPDATE_FAIL';
// D
export const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST';
export const DELETE_PLAYLIST_SUCCESS = 'playlists/DELETE_PLAYLIST_SUCCESS';
export const DELETE_PLAYLIST_FAIL = 'playlists/DELETE_PLAYLIST_FAIL';
// Misc
export const CLEAR_PLAYLISTS = 'playlists/CLEAR_PLAYLISTS';

// Client
// checkmark screen stuff
export const ADD_SONG_TO_TO_DELETE_SET = 'savingSongs/ADD_SONG_TO_TO_DELETE_SET';
export const DELETE_SAVED_SONGS = 'savingSongs/DELETE_SAVED_SONGS';
export const REMOVE_SONG_FROM_TO_DELETE_SET = 'savingSongs/REMOVE_SONG_FROM_TO_DELETE_SET';
export const RESET_TO_DELETE_SET = 'savingSongs/RESET_TO_DELETE_SET';

export const ADD_TO_NEW_PLAYLIST_SONGS = 'playlists/ADD_TO_NEW_PLAYLIST_SONGS';
export const LOAD_SAVED_SONGS = 'playlists/LOAD_SAVED_SONGS';
export const LOAD_SAVED_SONGS_SUCCESS = 'playlists/LOAD_SAVED_SONGS_SUCCESS';
export const LOAD_SAVED_SONGS_FAIL = 'playlists/LOAD_SAVED_SONGS_FAIL';
export const PLAYLIST_SCROLL_IS_NEGATIVE = 'playlists/PLAYLIST_SCROLL_IS_NEGATIVE';
export const PLAYLIST_SCROLL_IS_NOT_NEGATIVE = 'playlists/PLAYLIST_SCROLL_IS_NOT_NEGATIVE';
export const RESET_SAVED_SONGS_SET = 'playlists/RESET';
export const SAVE_RANKED_SONG = 'savingSongs/SAVE_RANKED_SONG';
export const SAVE_RANKED_SONG_SUCCESS = 'savingSongs/SAVE_RANKED_SONG_SUCCESS';
export const SET_PLAYLIST_MODAL_FULL_SCREEN = 'playlists/SET_PLAYLIST_MODAL_FULL_SCREEN';
export const SET_PLAYLIST_MODAL_HALF_SCREEN = 'playlists/SET_PLAYLIST_MODAL_HALF_SCREEN';
export const SET_PLAYLIST_MODAL_OPEN = 'playlists/SET_PLAYLIST_MODAL_OPEN';
export const SET_PLAYLIST_MODAL_CLOSED = 'playlists/SET_PLAYLIST_MODAL_CLOSED';
export const SET_SAVED_SONG_PLAYLIST_ID = 'playlists/SET_SAVED_SONG_PLAYLIST_ID';

export const OPEN_MODAL = 'playlists/OPEN_MODAL';
export const CLOSE_MODAL = 'playlists/CLOSE_MODAL';
export const UPDATE_NEW_PLAYLIST_NAME = 'playlists/UPDATE_NEW_PLAYLIST_NAME';

// Queue
export const FILL_QUEUE = 'queue/FILL_QUEUE';
export const FINISHED_NAVVING_TO_PLAY_SCREEN = 'queue/FINISHED_NAVVING_TO_PLAY_SCREEN';
export const LOAD_QUEUE_STARTING_AT_ID = 'queue/LOAD_QUEUE_STARTING_FROM_ID';
export const LOAD_SONGS = 'queue/LOAD';
export const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
export const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';
export const LOAD_SHARED_SONG_QUEUE = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD';
export const LOAD_SHARED_SONG_QUEUE_SUCCESS = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_SUCCESS';
export const LOAD_SHARED_SONG_QUEUE_FAIL = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_FAIL';
export const RESET_QUEUE = 'queue/RESET_QUEUE';
export const SET_CUR_PLAYLIST_ID = 'queue/SET_CUR_PLAYLIST_ID';
export const PLAYBACK_STATE = 'playback/STATE';
export const PLAYBACK_TRACK = 'playback/TRACK';
export const PLAY_SHUFFLED_PLAYLIST = 'queue/SHUFFLE';
export const SET_CUR_TRACK = 'queue/SET_CUR_TRACK';

export const MOOD_TYPE = 'mood';
export const LEADERBOARD_TYPE = 'leaderboard';

// Score
export const CLEAR_SCORE = 'score/CLEAR_SCORE';
export const INCREMENT_SCORE = 'score/INCREMENT_SCORE';
export const SEND_SCORE_SUCCESS = 'score/SEND_SCORE_SUCCESS';
export const SEND_SCORE_FAIL = 'score/SEND_SCORE_FAIL';

// Settings
export const DATA_TRACK_TOGGLE = 'settings/DATA_TRACK_TOGGLE';

/** Other Constants * */
// Analytics events
export const anal = {
  songShare: 'Song Share',
  songStar: 'Song Star',
  songPlay: 'Song Play',
  appOpen: 'App Open',
  deepLinkOpen: 'Deep Link Open',
  login: 'Login',
};
