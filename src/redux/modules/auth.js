import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from '../constants';

export const initialState = {
  email: '',
  name: '',
  photoURL: '',
  uid: '',
  userIsLoggedIn: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      const {
        email,
        uid,
        providerData: [{ displayName: name, photoURL }],
      } = action.userInfo;
      // toDO: get firebase JWT into newstate
      const newState = {
        ...state,
        email,
        name,
        photoURL,
        uid,
        userIsLoggedIn: true,
      };
      return newState;
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
