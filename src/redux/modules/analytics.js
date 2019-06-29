import axios from 'axios';
import moment from 'moment';
import {
  LOG_EVENT,
  SET_DEVICE_INFO,
  SET_USER_ID,
  API_KEY,
} from '../constants';

const initialState = {
  userId: '',
  deviceId: '',
  deviceIsEmulator: true,
  eventsTracked: 0,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOG_EVENT:
      // can use eventsTracked to batch send events later if needed
      return { ...state, eventsTracked: state.eventsTracked + 1 };
    case SET_DEVICE_INFO:
      // if not sure whether device is emulator or not, just assume it is
      const isEmulator = action.isEmulator == null ? true : action.isEmulator;
      return { ...state, deviceId: action.deviceId, deviceIsEmulator: isEmulator };
    case SET_USER_ID:
      return { ...state, userId: action.userId };
    default:
      return state;
  }
}

// IF YOU'RE TESTING ON A PHYSICAL DEVICE USE THIS LOGEVENT FUNCTION
// OR ADD A NEW TEST PROP (e.g. `testSongShare='Test Song Share'`) IN THE CONSTANTS FILE
// export function logEvent(eventName, eventProperties, userProperties) {
//   console.warn('logged event');
//   console.warn('with eventProperties', eventProperties);
//   return {
//     type: LOG_EVENT,
//   };
// }

/**
 * @required:
 *    @param: {string} eventName - name of the event you're tracking (e.g. 'Play Song')
 * @optional:
 *    @param: {object} eventProperties - additional data you want to track with the event
 *      e.g. {'songSource': 'Mood', 'song': {'title': 'Only Time', 'artist': 'Enya'}}
*/
export function logEvent(eventName, eventProperties) {
  return async (dispatch, getState) => {
    // if user turned off data tracking, exit this func immediately
    if (!getState().settings.dataShouldBeTracked) return;
    const { userId, deviceId, deviceIsEmulator } = getState().analytics;

    // do not allow emulators to send analytics
    if (deviceIsEmulator) return;

    if (!userId.length && !deviceId.length) {
      // one of userId || device_id are REQUIRED
      // if you have neither, gtfo and don't try to log an event
      return;
    }

    // Initialize an object to send off to amplitude
    const eventObj = { event_type: eventName };

    // Set properties on the event obj
    if (eventProperties != null) eventObj.event_properties = eventProperties;

    // User properties will just be a dump of whatever is in the auth state
    const userProperties = getState().auth;
    if (userProperties != null) eventObj.user_properties = userProperties;

    // UserID should get set on login, deviceId should be set on app open
    if (userId.length > 0) eventObj.user_id = userId;
    if (deviceId.length > 0) eventObj.device_id = deviceId;

    const encodedEventObj = encodeURIComponent(JSON.stringify(eventObj));

    // build the query
    let params = `?api_key=${API_KEY}`;
    const insertId = eventName + moment().format('hmmss');
    params += `&insert_id=${encodeURIComponent(insertId)}`; // amplitude uses this param to dedupe events
    params += `&event=${encodedEventObj}`;
    const url = `https://api.amplitude.com/httpapi${params}`;

    // make the request
    try {
      // DEBUG:
      // console.warn('posting eventObj: ', eventObj);
      // console.log('posturl: ', url);
      axios.post(url);
    } catch (e) {
      console.log('error: ', e.response);
    }
    dispatch({ type: LOG_EVENT });
  };
}

export function setDeviceInfo(deviceId, isEmulator) {
  return { type: SET_DEVICE_INFO, deviceId, isEmulator };
}

export function setUserId(userId) {
  return { type: SET_USER_ID, userId };
}
