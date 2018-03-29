import NavigationStack from '../../main-components/navigation-stack';
import { NavigationActions } from 'react-navigation';

const initialState = NavigationStack.router.getStateForAction(
  NavigationActions.navigate({ routeName: "Splash" })
);

export default (state = initialState, action) => {
  const newState = NavigationStack.router.getStateForAction(action, state);
  return newState || state;
};
