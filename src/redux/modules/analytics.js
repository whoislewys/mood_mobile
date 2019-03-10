import axios from 'axios';
import moment from 'moment';

const LOG_EVENT = 'ANAL/LOG_EVENT';
const SET_DEVICE_INFO = 'ANAL/SET_DEVICE_INFO';
const SET_USER_ID = 'ANAL/SET_USER_ID';
const API_KEY = 'c1bb5c361a35b3978494ded3f756fb65';

const initialState = {
  userId: '',
  deviceId: '',
  deviceIsEmulator: true,
  eventsTracked: 0,
};

export default function reducer(state = initialState, action = {}) {
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
 *    @param: {object} userProperties - user data you want to track with the event
 *      e.g. {'cohort': 'Instagram Referrals'}
*/
export function logEvent(eventName, eventProperties, userProperties) {
  return async (dispatch, getState) => {
    // https://amplitude.zendesk.com/hc/en-us/articles/204771828-HTTP-API
    const { userId, deviceId, deviceIsEmulator } = getState().analytics;

    // do not allow emulators to send analytics
    if (deviceIsEmulator) return;

    if (!userId.length && !deviceId.length) {
      // one of userId || device_id are REQUIRED
      // if you have neither, gtfo and don't try to log an event
      return;
    }

    // prepare an event object to be an event parameter
    const eventObj = { event_type: eventName };
    if (eventProperties != null) eventObj.event_properties = eventProperties;
    if (userProperties != null) eventObj.user_properties = userProperties;
    if (userId.length > 0) eventObj.userId = userId;
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
      // console.log('posturl: ', url);
      // console.log('eventObj');
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
  // get the users UUID on login
  return { type: SET_USER_ID, userId };
}
