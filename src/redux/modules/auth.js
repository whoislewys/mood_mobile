const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const initialState = {
  userIsLoggedIn: false,
  username: '',
  email: '',
  id: '',
  photoUrl: '',
  name: '',
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, userIsLoggedIn: true };
    case USER_LOGGED_OUT:
      return { ...state, userIsLoggedIn: false };
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
