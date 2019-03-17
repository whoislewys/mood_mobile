const USER_LOGGED_IN = 'USER_LOGGED_IN';

const initialState = {
  isUserLoggedIn: false,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, isUserLoggedIn: true };
    default:
      return state;
  }
}

export function userLoggedIn() {
  return {
    type: USER_LOGGED_IN,
  };
}

export function userLoggedOut() {
  // TODO
}
