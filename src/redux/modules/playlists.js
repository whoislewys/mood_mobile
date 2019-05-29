import axios from 'axios';
import firebase from 'react-native-firebase';
import {
  ADD_TO_NEW_PLAYLIST_SONGS,
  ADD_SONG_TO_TO_DELETE_SET,
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  DELETE_SAVED_SONGS,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAIL,
  LOAD_SAVED_SONGS,
  LOAD_SAVED_SONGS_SUCCESS,
  LOAD_SAVED_SONGS_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL,
  PLAYLIST_SCROLL_IS_NEGATIVE,
  PLAYLIST_SCROLL_IS_NOT_NEGATIVE,
  REMOVE_SONG_FROM_TO_DELETE_SET,
  RESET_TO_DELETE_SET,
  SAVE_RANKED_SONG,
  SAVE_RANKED_SONG_SUCCESS,
  SET_CUR_PLAYLIST_ID,
  SET_PLAYLIST_MODAL_FULL_SCREEN,
  SET_PLAYLIST_MODAL_HALF_SCREEN,
  SET_PLAYLIST_MODAL_OPEN,
  SET_PLAYLIST_MODAL_CLOSED,
  SET_SAVED_SONG_PLAYLIST_ID,
  UPDATE_NEW_PLAYLIST_NAME,
  UPDATE_PLAYLIST,
  UPDATE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_FAIL,
  PLAYLIST_LOAD_SONGS,
  PLAYLIST_LOAD_SONGS_SUCCESS,
  PLAYLIST_LOAD_SONGS_FAIL,
  RESET_SAVED_SONGS_SET,
} from '../constants';
import { mapSongsToValidTrackObjects } from '../util';

export const initialState = {
  curPlaylistId: NaN,
  curPlaylistTitle: '',
  error: {},
  isCreatePlaylistModalOpen: false,
  isPlaylistModalOpen: false,
  loading: false,
  newPlaylistName: '',
  playlists: [],
  playlistScrollIsNegative: false,
  savedSongs: [],
  savedSongsPlaylistId: -1,
  newPlaylistSongs: new Set(), // keeps track of songs to add to a new playlist
  songIdsToAdd: new Set(),
  songIdsToDelete: new Set(), // keeps track of songs the user wants to remove from the cur playlist
  songs: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Client

    case ADD_SONG_TO_TO_DELETE_SET:
      // get all the songs from the previous songIdsToDelete set
      const newSongIdsToDelete = new Set();
      if (state.songIdsToDelete === undefined) {
        newSongIdsToDelete.add(action.songIdToDelete);
      } else {
        state.songIdsToDelete.forEach(song => newSongIdsToDelete.add(song));
        newSongIdsToDelete.add(action.songIdToDelete);
      }
      return { ...state, songIdsToDelete: newSongIdsToDelete };
    case REMOVE_SONG_FROM_TO_DELETE_SET:
      // if somehow you can resave songs but your deleted set is empty, just return the previous state
      if (state.songIdsToDelete === undefined) return { ...state };
      // copy all the songs from the previous songIdsToDelete set into a new set
      const songIdsToDeleteAfterResaving = new Set();
      state.songIdsToDelete.forEach(song => songIdsToDeleteAfterResaving.add(song));
      // remove the songs to resave from the deleted set
      songIdsToDeleteAfterResaving.delete(action.songIdToResave);
      return { ...state, songIdsToDelete: songIdsToDeleteAfterResaving };
    case RESET_TO_DELETE_SET:
      console.warn('resetting');
      return { ...state, songIdsToDelete: new Set() };

    case SET_SAVED_SONG_PLAYLIST_ID:
      return { ...state, savedSongsPlaylistId: action.savedSongsPlaylistId };

    // new playlist modal
    case OPEN_MODAL:
      return { ...state, isCreatePlaylistModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, isCreatePlaylistModalOpen: false };
    case UPDATE_NEW_PLAYLIST_NAME:
      return { ...state, newPlaylistName: action.newPlaylistName };

    case ADD_TO_NEW_PLAYLIST_SONGS:
      const newestPlaylistSongs = new Set();
      if (state.newPlaylistSongs === undefined) {
        newestPlaylistSongs.add(action.songIdToSave);
      } else {
        state.newPlaylistSongs.forEach(song => newestPlaylistSongs.add(song));
        newestPlaylistSongs.add(action.songIdToSave);
      }
      return { ...state, newPlaylistSongs: newestPlaylistSongs };
    case RESET_SAVED_SONGS_SET:
      return { ...state, newPlaylistSongs: new Set() };

    case PLAYLIST_SCROLL_IS_NEGATIVE:
      return { ...state, playlistScrollIsNegative: true };
    case PLAYLIST_SCROLL_IS_NOT_NEGATIVE:
      return { ...state, playlistScrollIsNegative: false };
    case SET_PLAYLIST_MODAL_FULL_SCREEN:
      return { ...state, isPlaylistModalFullScreen: true };
    case SET_PLAYLIST_MODAL_HALF_SCREEN:
      return { ...state, isPlaylistModalFullScreen: false };
    case SET_PLAYLIST_MODAL_OPEN:
      return { ...state, isPlaylistModalOpen: true };
    case SET_PLAYLIST_MODAL_CLOSED:
      return { ...state, isPlaylistModalOpen: false };

    case SET_CUR_PLAYLIST_ID:
      const { curPlaylistTitle, curPlaylistId } = action;
      return { ...state, curPlaylistTitle, curPlaylistId };

    // Service
    case CREATE_PLAYLIST:
      return { ...state, loading: true };
    case CREATE_PLAYLIST_SUCCESS:
      return { ...state, loading: false };
    case CREATE_PLAYLIST_FAIL:
      return { ...state, loading: false, error: 'Error while creating playlist' };

    case LOAD_PLAYLISTS:
      return { ...state, loading: true };
    case LOAD_PLAYLISTS_SUCCESS:
      const playlists = action.payload.data;
      return { ...state, loading: false, playlists };
    case LOAD_PLAYLISTS_FAIL:
      return { ...state, loading: false, error: 'Error while fetching playlist' };

    case LOAD_SAVED_SONGS:
      return { ...state, loading: true };
    case LOAD_SAVED_SONGS_SUCCESS:
      const savedSongs = mapSongsToValidTrackObjects(action.savedSongs);
      return {
        ...state,
        savedSongs,
        loading: false,
      };
    case LOAD_SAVED_SONGS_FAIL:
      return { ...state, loading: false, error: action.e };

    case PLAYLIST_LOAD_SONGS:
      return { ...state, loading: true, songs: [] };
    case PLAYLIST_LOAD_SONGS_SUCCESS:
      const songs = mapSongsToValidTrackObjects(action.payload.data.songs);
      return { ...state, loading: false, songs };
    case PLAYLIST_LOAD_SONGS_FAIL:
      return {
        ...state,
        error: 'Error while fetching playlist songs',
        loading: false,
        songs: [],
      };

    case UPDATE_PLAYLIST:
      return { ...state, loading: true };
    case UPDATE_PLAYLIST_SUCCESS:
      const { playlistId, updatedSongs } = action;
      if (playlistId === state.savedSongsPlaylistId) {
        // need to update the store's saved songs because you might call update again with your old saved songs
        return { ...state, loading: false, savedSongs: mapSongsToValidTrackObjects(updatedSongs) };
      }
      return { ...state, loading: false, songs: updatedSongs };
    case UPDATE_PLAYLIST_FAIL:
      return { ...state, loading: false, error: action.e };
    default:
      return state;
  }
}

/* Action Creators */
// Client side
export function openModal() {
  return {
    type: OPEN_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function addToNewPlaylistSongs(newPlaylistSong) {
  return {
    type: ADD_TO_NEW_PLAYLIST_SONGS,
    songIdToSave: newPlaylistSong.id,
  };
}

export function addSongToDeleted(savedSongToDelete) {
  // for when people 'uncheck' a saved song
  return {
    type: ADD_SONG_TO_TO_DELETE_SET,
    songIdToDelete: savedSongToDelete.id,
  };
}

export function removeSongFromDeleted(songToResave) {
  return {
    type: REMOVE_SONG_FROM_TO_DELETE_SET,
    songIdToResave: songToResave.id,
  };
}

export function resetToDeleteSet() {
  return { type: RESET_TO_DELETE_SET };
}

export function deleteToDeleteSet() {

}

export function setCurrentPlaylist(curPlaylist) {
  return {
    type: SET_CUR_PLAYLIST_ID,
    curPlaylistTitle: curPlaylist.name,
    curPlaylistId: curPlaylist.id,
  };
}

// Service
export function updateNewPlaylistName(newPlaylistName) {
  return {
    type: UPDATE_NEW_PLAYLIST_NAME,
    newPlaylistName,
  };
}

export function createPlaylist() {
  return async (dispatch, getState) => {
    // start by closing the new playlist modal and checking if user is logged in
    dispatch(closeModal());

    if (!getState().auth.userIsLoggedIn) return;

    dispatch({ type: CREATE_PLAYLIST });
    try {
      // submit new playlist
      const playlistNameToSubmit = getState().playlists.newPlaylistName === '' ? 'New Playlist'
        : getState().playlists.newPlaylistName;
      console.warn('creating playlist: ', playlistNameToSubmit);
      const token = await firebase.auth().currentUser.getIdToken();
      const newPlaylist = await axios.post('https://api.moodindustries.com/api/v1/playlists',
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          name: playlistNameToSubmit,
          description: '',
          song_ids: Array.from(getState().playlists.newPlaylistSongs),
        },
        { headers: { Authorization: token } });
      const newPlaylistId = newPlaylist.data.id;
      // dispatch success action & refresh the list of playlists
      dispatch({ type: CREATE_PLAYLIST_SUCCESS, payload: newPlaylistId });

      dispatch(loadPlaylists());
    } catch (err) {
      // in case an error happened, close the modal
      dispatch(closeModal());
      dispatch({ type: CREATE_PLAYLIST_FAIL, err });
    }
  };
}

export function loadPlaylists() {
  return async (dispatch) => {
    dispatch({ type: LOAD_PLAYLISTS });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const playlists = await axios.get('https://api.moodindustries.com/api/v1/playlists',
        {
          headers: { Authorization: token },
          t: 'EXVbAWTqbGFl7BKuqUQv',
        });
      dispatch({ type: LOAD_PLAYLISTS_SUCCESS, payload: playlists });
    } catch (e) {
      dispatch({ type: LOAD_PLAYLISTS_FAIL });
    }
  };
}

// Actually loads songs
async function loadSongsForPlaylistIdHelper(id) {
  const token = await firebase.auth().currentUser.getIdToken();
  try {
    const songs = await axios.get(`https://api.moodindustries.com/api/v1/playlists/${id}`,
      {
        headers: { Authorization: token },
        t: 'EXVbAWTqbGFl7BKuqUQv',
      });
    return songs;
  } catch (e) {
    throw e;
  }
}

// TODO: rename this function more betterer
// Used to load songs for current playlist into redux store
export function loadSongsForPlaylistId(id) {
  return async (dispatch) => {
    dispatch({ type: PLAYLIST_LOAD_SONGS });
    try {
      const songs = await loadSongsForPlaylistIdHelper(id);
      dispatch({
        type: PLAYLIST_LOAD_SONGS_SUCCESS,
        payload: songs,
      });
    } catch (e) {
      dispatch({ type: PLAYLIST_LOAD_SONGS_FAIL });
    }
  };
}

export function getSavedSongPlaylist() {
  // TODO: add logic in splash when handling shares to check that they are logged in before navigating to playlists
  return async (dispatch, getState) => {
    // check for playlists
    let { playlists } = getState().playlists;
    if (!playlists.length) {
      // if playlists haven't been loaded, load them
      await dispatch(loadPlaylists());
    }

    // now that playlists are loaded, look for saved song playlist
    playlists = getState().playlists.playlists;
    const savedSongsPlaylist = playlists.find(p => p.name === 'Saved Songs');
    if (savedSongsPlaylist !== undefined) {
      // 'Saved Songs' playlist found, save the id
      // TODO: also fill the state's savedSongs
      const savedSongsPlaylistId = savedSongsPlaylist.id;
      dispatch({
        type: SET_SAVED_SONG_PLAYLIST_ID,
        savedSongsPlaylistId,
      });
    } else {
      // if we couldn't find the 'Saved Songs' playlist, create it
      try {
        const token = await firebase.auth()
          .currentUser
          .getIdToken();
        const newPlaylist = await axios.post('https://api.moodindustries.com/api/v1/playlists',
          {
            t: 'EXVbAWTqbGFl7BKuqUQv',
            name: 'Saved Songs',
            description: '',
            song_ids: [],
          },
          { headers: { Authorization: token } });

        // TODO: also fill the state's savedSongs?
        const newPlaylistId = newPlaylist.data.id;
        console.warn('new savedSongs playlist created: ', newPlaylist);
        console.warn('here\'s it\'s id: ', newPlaylistId);
        dispatch({
          type: SET_SAVED_SONG_PLAYLIST_ID,
          newPlaylistId,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export function loadSavedSongs() {
  // loads the current user's saved songs playlist into the store
  console.warn('loading saved songs');
  return async (dispatch, getState) => {
    dispatch({
      type: LOAD_SAVED_SONGS,
    });
    try {
      if (getState().playlists.savedSongsPlaylistId === -1) {
        await dispatch(getSavedSongPlaylist());
      }
      const { savedSongsPlaylistId } = getState().playlists;
      const token = await firebase.auth().currentUser.getIdToken();
      const savedSongsPlaylist = await axios.get(`https://api.moodindustries.com/api/v1/playlists/${savedSongsPlaylistId}`,
        {
          headers: { Authorization: token },
          t: 'EXVbAWTqbGFl7BKuqUQv',
        });

      // handle case where there are no songs in saved songs playlist
      if (savedSongsPlaylist.data.songs === undefined) {
        dispatch({
          type: LOAD_SAVED_SONGS_SUCCESS,
          savedSongs: [],
        });
      } else {
        dispatch({
          type: LOAD_SAVED_SONGS_SUCCESS,
          savedSongs: savedSongsPlaylist.data.songs,
        });
      }
    } catch (e) {
      dispatch({
        type: LOAD_SAVED_SONGS_FAIL,
        error: e,
      });
    }
  };
}

export function updatePlaylist(playlistId, songIds) {
  return async (dispatch) => {
    // Prevent user from saving duplicate songs to a playlist
    const seen = new Set();
    const songIdsHaveDuplicates = songIds.some(songId => seen.size === seen.add(songId).size);
    console.warn('updating playlist id: ', playlistId);
    console.warn('updating playlist with songids: ', songIds);
    console.warn('song ids have duplicates: ', songIdsHaveDuplicates);
    // TODO: add an alert here to warn user of duplicates
    if (songIdsHaveDuplicates) {
      return;
    }
    console.warn('update playlist succeding');

    dispatch({ type: UPDATE_PLAYLIST });
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const url = `https://api.moodindustries.com/api/v1/playlists/${playlistId}`;
      console.warn('patching UPDATE to url: ', url);
      const songsResp = await axios.patch(url,
        {
          t: 'EXVbAWTqbGFl7BKuqUQv',
          // can change name, description, & song_ids in here
          song_ids: songIds,
        },
        { headers: { Authorization: token } });


      if (songsResp.data.songs === undefined) {
        dispatch({
          type: UPDATE_PLAYLIST_SUCCESS,
          updatedSongs: [],
          playlistId,
        });
      } else {
        dispatch({
          type: UPDATE_PLAYLIST_SUCCESS,
          updatedSongs: songsResp.data.songs,
          playlistId,
        });
      }

    } catch (e) {
      dispatch({ type: UPDATE_PLAYLIST_FAIL, e });
    }
  };
}

/**
 * @param {int} playlistId - you know what it is
 * @param {Set} songIdsToDelete - a set of songIds to deleted
 *              (like from state.playlists.songIdsToDelete)
 */
export function deleteSongsFromPlaylist(playlistId, songIdsToDelete) {
  return async (dispatch, getState) => {
    console.warn('deleting songIds', songIdsToDelete);
    console.warn('from playlistId: ', playlistId);
    dispatch({ type: DELETE_SAVED_SONGS });

    let updatedSongIds = [];

    if (playlistId === getState().playlists.savedSongsPlaylistId) {
      // For Saved Songs playlist,
      // remove any song from the savedSongs playlist that has an id in songIdsToDelete
      console.warn('playlist to del from is saved songs');
      const { savedSongs } = getState().playlists;
      console.warn('saved songs: ', savedSongs);
      const savedSongsMinusSongIdsToDelete = savedSongs.filter(song => !songIdsToDelete.has(song.id));
      console.warn('saved Song Ids Minus SongIds To Delete: ', savedSongsMinusSongIdsToDelete);
      updatedSongIds = savedSongsMinusSongIdsToDelete.map(song => song.id);
      console.warn('updated song ids: ', updatedSongIds);
      await dispatch(updatePlaylist(playlistId, updatedSongIds));
    } else {
      // If 'Saved Songs' playlist isn't being updated, then the curPlaylist should be updated.
      // Filter out item from curPlaylist that has an id in songIdsToDelete.
      console.warn('NOT SAVED SONGS. Deleting from curPlaylist w/ id: ', playlistId);
      const curPlaylistSongs = getState().playlists.songs;
      updatedSongIds = curPlaylistSongs.filter(song => !songIdsToDelete.has(song.id))
        .map(song => song.id);
      console.warn('updated playlist song ids: ', curPlaylistSongs);
      await dispatch(updatePlaylist(playlistId, updatedSongIds));
    }
  };
}

export function resetNewPlaylistSongs() {
  return ({ type: RESET_SAVED_SONGS_SET });
}


/**
 * @param: {int} songId - should be passed down from wherever the song was selected (for example,
 * state.queue.curTrack when adding a track from the PlayScreen)
 * @param: {int} playlistId - should be passed in from a selected playlist row
 */
export function saveSongToPlaylist(songId, playlistId) {
  console.warn(`attempting to save songid ${songId} to playlistId: ${playlistId}`);
  // should save song to saved songs playlist
  return async (dispatch, getState) => {
    if (getState().playlists.savedSongs) {
      // if the user hasn't loaded their saved songs yet, load it for them
      await dispatch(loadSavedSongs());
    }
    dispatch({ type: SAVE_RANKED_SONG });

    // try and fetch the songs. if they fail, just short circuit out of this function
    let playlistSongs;
    try {
      playlistSongs = await loadSongsForPlaylistIdHelper(playlistId);
    } catch (e) {
      dispatch({ type: PLAYLIST_LOAD_SONGS_FAIL, error: e });
      return;
    }

    console.warn('songs for playlist to add to: ', playlistSongs.data.songs);

    const playlistSongIds = playlistSongs.data.songs.map(s => s.id);
    playlistSongIds.push(songId);
    console.warn('songs to add to', playlistSongIds);
    dispatch(updatePlaylist(playlistId, playlistSongIds));
  };
}

export function saveSong(song) {
  // should save song to saved songs playlist
  return async (dispatch, getState) => {
    if (!getState().playlists.savedSongs.length) {
      // if the user hasn't loaded their saved songs yet, load it for them
      console.warn('user hasn\'t loaded saved songs playlist. loading', getState().playlists.savedSongsPlaylistId);
      await dispatch(loadSavedSongs());
    }
    console.warn('user ranked a song! saving...');
    dispatch({ type: SAVE_RANKED_SONG });

    let { savedSongsPlaylistId } = getState().playlists;
    if (savedSongsPlaylistId === -1) {
      // saved songs playlist has not been found yet. create it
      await dispatch(getSavedSongPlaylist());
      console.warn('no saved song playlist yet, creating...');
    }

    savedSongsPlaylistId = getState().playlists.savedSongsPlaylistId;
    const { savedSongs } = getState().playlists;
    // TODO: make it so that user cannot save a duplicate saved song (filter here instead of map?)
    console.warn('savedsongs: ', savedSongs);
    const savedSongIds = savedSongs.map(s => s.id);
    console.warn('savedSongIds before push:', savedSongIds);
    console.warn('pushing songId:', song.id);
    savedSongIds.push(song.id);
    console.warn('[after push] saving these songs:', savedSongIds);
    console.warn('to playlistid: ', savedSongsPlaylistId);
    await dispatch(updatePlaylist(savedSongsPlaylistId, savedSongIds));

    dispatch({ type: SAVE_RANKED_SONG_SUCCESS });

    // refresh songs after update is complete
    await dispatch(loadSavedSongs());
  };
}

export function setPlaylistScrollingNegative() {
  return {
    type: PLAYLIST_SCROLL_IS_NEGATIVE,
  };
}

export function setPlaylistScrollingNotNegative() {
  return {
    type: PLAYLIST_SCROLL_IS_NOT_NEGATIVE,
  };
}

export function setPlaylistModalFullScreen() {
  return {
    type: SET_PLAYLIST_MODAL_FULL_SCREEN,
  };
}

export function setPlaylistModalHalfScreen() {
  return {
    type: SET_PLAYLIST_MODAL_HALF_SCREEN,
  };
}

export function setPlaylistModalOpen() {
  console.warn('modal open');
  return { type: SET_PLAYLIST_MODAL_OPEN };
}

export function setPlaylistModalClosed() {
  console.warn('modal close');
  return { type: SET_PLAYLIST_MODAL_CLOSED };
}
