import NavigationStack from "../../main-components/navigation-stack.js";

const initialState = NavigationStack.router.getStateForAction(
  NavigationStack.router.getActionForPathAndParams('Splash')
);

const navigationReducer = (state = initialState, action) => {
  const newState = NavigationStack.router.getStateForAction(action, state);
  return newState || state;
};

export default navigationReducer;
