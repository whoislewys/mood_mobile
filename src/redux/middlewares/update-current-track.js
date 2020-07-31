// import TrackPlayer from 'react-native-track-player';
// import {
//   PLAYBACK_TRACK,
//   SET_CUR_TRACK,
// } from '../constants';

// export const updateCurrentTrack = store => next => (action) => {
//   // This middleware waits a bit after getting a track-change event,
//   // then makes sure the store's current track is in sync with the TrackPlayer
//   next(action);
//   if (action.type === PLAYBACK_TRACK) {
//     let updateCurTrackTimer;
//     let updateCurrentTrackFunc = async () => {
//       try {
//         // Check if curtrack coming from track change action & the curtrack coming from the TrackPlayer are different
//         // If they are, update the store with the TrackPlayer's curTrack
//         const curTrack = action.newCurTrack;
//         const tpCurTrack = await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack());

//         // if either track is null for some reason, return
//         if (curTrack == null || tpCurTrack.id == null) return;

//         if (curTrack.id !== tpCurTrack.id) {
//           const storeQueue = store.getState().queue.queue;
//           store.dispatch({
//             type: SET_CUR_TRACK,
//             newCurTrack: tpCurTrack,
//             newCurTrackIndex: storeQueue.findIndex(findTrack => findTrack.id === tpCurTrack.id),
//           });
//         }

//         if (updateCurTrackTimer != null) {
//           // once the timer fires and calls this func, clean up that timer as final step
//           // if you need to spin up another check, do it based on a lock screen open event
//           updateCurTrackTimer.clearTimeout();
//         }
//       } catch (e) {}
//     };

//     updateCurTrackTimer = setTimeout(updateCurrentTrackFunc, 2000);
//   }
// };
