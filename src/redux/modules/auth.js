import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from '../constants';

export const initialState = {
  // Be sure that you ONLY USE BASIC TYPES in the auth state
  // This is good redux practice in general,
  // but especially important here because this object is dumped into every single analytic
  email: '',
  name: '',
  photoURL: '',
  userIsLoggedIn: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      const {
        email,
        providerData: [{ displayName: name, photoURL }],
      } = action.userInfo;

      return {
        ...state,
        email,
        name,
        photoURL,
        userIsLoggedIn: true,
      };

    case USER_LOGGED_OUT:
      return initialState;

    default:
      return state;
  }
}

export function userLoggedIn(userInfo) {
  return {
    type: USER_LOGGED_IN,
    userInfo,
  };
}

export function userLoggedOut() {
  return {
    type: USER_LOGGED_OUT,
  };
}
