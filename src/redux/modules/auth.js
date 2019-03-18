const USER_LOGGED_IN = 'USER_LOGGED_IN';

const initialState = {
  isUserLoggedIn: false,
  username: '',
  email: '',
  id: '',
  photoUrl: '',
  name: '',
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, isUserLoggedIn: true };
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
  // TODO
}
