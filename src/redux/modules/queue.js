// import { Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import shuffle from '../util';
import { startScoreTimer } from './score';

const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

const LOAD_SHARED_SONG_QUEUE = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD';
const LOAD_SHARED_SONG_QUEUE_SUCCESS = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_SUCCESS';
const LOAD_SHARED_SONG_QUEUE_FAIL = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_FAIL';

const LOAD_LEADERBOARD_SONG_QUEUE = 'queue/LOAD_LEADERBOARD_SONG_QUEUE';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  playback: null,
  track: null,
  curTrack: null,
  sharedTrack: null,
};

export function loadSongData(list) {
  return shuffle(list.map(t => ({
    id: t.id.toString(),
    url: t.file,
    title: t.name,
    artist: t.artist,
    album: t.album_name,
    artwork: t.art_url,
    mood_id: t.mood_id,
  })), 'artist');
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // loading songs for mood
    case LOAD_SONGS:
      return { ...state, loading: true, queue: [] };
    case LOAD_SONGS_SUCCESS:
      // load songs for mood, reset global score to 0, and set current track
      let songs = null;
      songs = loadSongData(action.payload.data);
      return {
        ...state,
        loading: false,
        queue: songs,
        curTrack: songs[0],
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };

    // shared songs
    case LOAD_SHARED_SONG_QUEUE:
      return {
        ...state,
        loading: true,
        queue: [],
        sharedTrack: action.sharedTrack,
      };
    case LOAD_SHARED_SONG_QUEUE_SUCCESS:
      console.log('action.payload.data', action.payload.data);
      const songs1 = loadSongData(action.payload.data);
      // add the sharedTrack to front of array
      songs1.unshift(state.sharedTrack);
      return {
        ...state,
        loading: false,
        queue: songs1,
        curTrack: songs1[0],
      };
    case LOAD_SHARED_SONG_QUEUE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };

    // leaderboard songs
    // TODO: make this actually play the songs once we've got thunks
    case LOAD_LEADERBOARD_SONG_QUEUE:
      // fills queue with leaderboard songs
      const { selectedLeaderboardSong, leaderboardSongs } = action;
      return {
        ...state,
        queue: leaderboardSongs,
        curTrack: selectedLeaderboardSong,
      };

    case PLAYBACK_STATE:
      return {
        ...state,
        playback: action.state,
      };
    case PLAYBACK_TRACK:
      let newCurTrack = state.queue.find(findTrack => findTrack.id === action.track);
      if (newCurTrack === undefined) newCurTrack = state.queue[0];
      return {
        ...state,
        track: action.track,
        curTrack: newCurTrack,
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

export function loadSharedSongQueue(sharedTrack) {
  console.log('sharedTrack in shares ong qsc: ', sharedTrack);
  return {
    type: LOAD_SHARED_SONG_QUEUE,
    sharedTrack,
    payload: {
      request: {
        url: `/moods/${sharedTrack.mood_id}/songs`,
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

export function loadLeaderboardSongQueue(selectedLeaderboardSong, leaderboardSongs) {
  // todo Dispatch resetScore() when this gets called
  return {
    type: LOAD_LEADERBOARD_SONG_QUEUE,
    selectedLeaderboardSong,
    leaderboardSongs,
  };
}

// TrackPlayer controls
export function handlePlayPress() {
  return async (dispatch, getState) => {
    console.log('queue in handlePlayPress thunk ', getState().queue.queue);
    // TO
    const { track, queue, playback } = getState().queue;
    if (track === null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(queue);
      await TrackPlayer.play();
    } else if (playback === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
}

export function skipToNext() {
  return async (dispatch, getState) => {
    // TODO
    if (getState().queue.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    }
    await TrackPlayer.skipToNext();
    dispatch(startScoreTimer());
  };
}

export function skipToPrevious() {
  return async (dispatch, getState) => {
    if (getState().queue.playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    }
    await TrackPlayer.skipToPrevious();
    dispatch(startScoreTimer());
  };
}

export function stopPlayback() {
  return async (dispatch, getState) => {
    if (!(getState().queue.track === null || getState().queue.playbackState === TrackPlayer.STATE_PAUSED)) {
      await TrackPlayer.pause();
    }
  };
}
