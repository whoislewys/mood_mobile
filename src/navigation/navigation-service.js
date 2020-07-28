import {NavigationActions} from 'react-navigation';

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const navigateToPlayScreenFromMoodScreen = () => {
  const currentScreenName = 'MoodScreen';
  navigate('Play', {
  });

  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: 'Play',
      params: {
        parentScreen: currentScreenName,
        visible: false,
        moodscreen: this.navigateToMoodScreen,
      },
    }),
  );
};

const navigations = {
  navigateToPlayScreenFromMoodScreen,
};

export default {
  navigate,
  setTopLevelNavigator,
};
