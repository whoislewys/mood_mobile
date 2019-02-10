// import { Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import shuffle from '../util';

const LOAD_SONGS = 'queue/LOAD';
const LOAD_SONGS_SUCCESS = 'queue/LOAD_SUCCESS';
const LOAD_SONGS_FAIL = 'queue/LOAD_FAIL';

// const LOAD_NON_EXPLICIT_SONGS = 'queue/LOAD_NON_EXPLICIT_SONGS/LOAD';
// const LOAD_NON_EXPLICIT_SONGS_SUCCESS = 'queue/LOAD_NON_EXPLICIT_SONGS/LOAD_SUCCESS';
// const LOAD_NON_EXPLICIT_SONGS_FAIL = 'queue/LOAD_NON_EXPLICIT_SONGS/LOAD_FAIL';

const LOAD_SHARED_SONG_QUEUE = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD';
const LOAD_SHARED_SONG_QUEUE_SUCCESS = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_SUCCESS';
const LOAD_SHARED_SONG_QUEUE_FAIL = 'queue/LOAD_SHARED_SONG_QUEUE/LOAD_FAIL';

const LOAD_LEADERBOARD_SONG_QUEUE = 'queue/LOAD_LEADERBOARD_SONG_QUEUE';

const HANDLE_EXPLICIT_TOGGLE = 'queue/HANDLE_EXPLICIT_TOGGLE';

const PLAYBACK_STATE = 'playback/STATE';
const PLAYBACK_TRACK = 'playback/TRACK';

const initialState = {
  loading: false,
  errors: null,
  queue: [],
  // (string) used to tell where the current queue came from (e.g. leaderboard, mood tile, etc)
  queueType: null,
  playback: null,
  track: null,
  curTrack: null,
  explicit: true,
};

export function loadSongData(list) {
  return shuffle(list.map(t => ({
    explicit: t.explicit,
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
    case LOAD_SONGS:
      return {
        ...state,
        loading: true,
        queue: [],
        explicit: action.explicit,
      };
    case LOAD_SONGS_SUCCESS:
      let songs = null;
      songs = loadSongData(action.payload.data);
      return {
        ...state,
        loading: false,
        queue: songs,
        queueType: 'Mood',
        curTrack: songs[0],
      };
    case LOAD_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while loading songs.',
      };

    // case LOAD_NON_EXPLICIT_SONGS:
    //   return { ...state, loading: true, queue: [] };
    // case LOAD_NON_EXPLICIT_SONGS_SUCCESS:
    //   let songs0 = null;
    //   songs0 = loadSongData(action.payload.data);
    //   return {
    //     ...state,
    //     loading: false,
    //     queue: songs0,
    //     curTrack: songs0[0],
    //     currentScore: 0,
    //   };
    // case LOAD_NON_EXPLICIT_SONGS_FAIL:
    //   return { ...state, loading: false, error: 'Error while loading songs.' };

    case LOAD_SHARED_SONG_QUEUE:
      return {
        ...state,
        loading: true,
        queue: [],
        sharedTrack: action.specificSong,
      };
    case LOAD_SHARED_SONG_QUEUE_SUCCESS:
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

    case LOAD_LEADERBOARD_SONG_QUEUE:
      // TODO: make this actually play the songs once we've got thunks
      // takes in leaderboard songs from leaderboard screen
      // fills the global queue with those leaderboard songs
      const { selectedLeaderboardSong, leaderboardSongs } = action;
      return {
        ...state,
        queue: leaderboardSongs,
        curTrack: selectedLeaderboardSong,
        queueType: 'Leaderboard',
      };

    case HANDLE_EXPLICIT_TOGGLE:
      console.log('explicit toggle state: ', action.newState);
      return { ...state, explicit: action.newState };

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

export function loadSongsForMoodId(moodId, explicit) {
  console.log('explicit songs? ', explicit);
  return {
    type: LOAD_SONGS,
    payload: {
      request: {
        url: `/moods/${moodId}/songs`,
        params: {
          explicit,
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
      },
    },
  };
}

export function loadSharedSongQueue(specificSong) {
  return {
    type: LOAD_SHARED_SONG_QUEUE,
    specificSong,
    payload: {
      request: {
        url: `/moods/${specificSong.mood_id}/songs`,
        params: {
          t: 'EXVbAWTqbGFl7BKuqUQv',
        },
      },
    },
  };
}

export function loadLeaderboardSongQueue(selectedLeaderboardSong, leaderboardSongs) {
  return {
    type: LOAD_LEADERBOARD_SONG_QUEUE,
    selectedLeaderboardSong,
    leaderboardSongs,
  };
}

export function handleExplicitToggle(newState) {
  return {
    type: HANDLE_EXPLICIT_TOGGLE,
    newState,
  };
  // if queue is empty, just set explicit prop on state to `true`
  // if queue is not empty, set explicit prop on state to `true` and fire loadSongsForMoodId
  // loadSongsForMoodId will require a small modification for handling explicit state
}

// TrackPlayer action creators
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

export function updatePlayback() {
  // should only used when coming back from lock screen
  console.log('calling updateplayback');
  return async () => {
    try {
      playbackState(await TrackPlayer.getState());
      playbackTrack(await TrackPlayer.getCurrentTrack());
    } catch (e) {
      // player not yet initialized, don't update anything
    }
  };
}
