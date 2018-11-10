import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';

import SplashScreen from '../screens/splash';
import MoodScreen from '../screens/mood';
import PlayScreen from '../screens/play';
import SettingsScreen from '../screens/settings';
import ErrorScreen from '../screens/error';

const map = SomeComponent => class SomeClass extends React.Component {
    render = () => {
      const screenProps = this.props.screenProps;
      delete this.props.screenProps; // for some reason not working
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} {...screenProps} />;
    }
};

export default createStackNavigator({
  Splash: { screen: map(SplashScreen) },
  Mood: { screen: map(MoodScreen) },
  Play: { screen: map(PlayScreen) },
  Settings: { screen: map(SettingsScreen) },
  Error: { screen: map(ErrorScreen) },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const { index, route } = scene;
      const last = index - 1;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      if (route.routeName === 'Settings') return { opacity, transform: [{ translateX }] };
      return { opacity, transform: [{ translateY }] };
    },
  }),
});
