import axios from 'axios';

const LOG_EVENT = 'ANAL/LOG_EVENT';
const SET_DEVICE_ID = 'ANAL/SET_DEVICE_ID';
const SET_USER_ID = 'ANAL/SET_USER_ID';
const API_KEY = 'c1bb5c361a35b3978494ded3f756fb65';

const initialState = {
  userId: '',
  deviceId: '',
  eventsTracked: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOG_EVENT:
      return { ...state, eventsTracked: state.eventsTracked + 1 };
    case SET_DEVICE_ID:
      return { ...state, deviceId: action.deviceId };
    case SET_USER_ID:
      return { ...state, userId: action.userId };
    default:
      return state;
  }
}

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
  return (dispatch, getState) => {
    // https://amplitude.zendesk.com/hc/en-us/articles/204771828-HTTP-API
    const { userId, deviceId } = getState().analytics;
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

    console.log('logged event obj: ', eventObj);

    const encodedEventObj = encodeURIComponent(JSON.stringify(eventObj));

    // build the query
    let params = `?api_key=${API_KEY}`;
    params += `&event=[${encodedEventObj}]`;
    const url = `https://api.amplitude.com/httpapi${params}`;

    // make the request
    try {
      axios.post(url);
    } catch (e) {
      console.log(e.response);
    }
    dispatch({ type: LOG_EVENT });
  };
}

export function setDeviceId(deviceId) {
  return { type: SET_DEVICE_ID, deviceId };
}

export function setUserId(userId) {
  // get the users UUID on login
  return { type: SET_USER_ID, userId };
}
