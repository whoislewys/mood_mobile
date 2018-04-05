import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';

import PlayScreen from '../play-screen';
import MoodScreen from '../mood-screen'
import SplashScreen from '../splash-screen';
import SettingsScreen from '../settings-screen';
import ErrorScreen from '../error-screen';

const map = (SomeComponent) => {
  return class SomeClass extends React.Component {
    render = () => {
      const screenProps = this.props.screenProps;
      delete this.props.screenProps;
      const {navigation: {state: {params}}} = this.props
      return <SomeComponent {...params} {...this.props} {...screenProps} />
    }
  }
}

export default NavigationStack = createStackNavigator({
  Splash: { screen: map(SplashScreen) },
  Mood: { screen: map(MoodScreen) },
  Play: { screen: map(PlayScreen) },
  Settings: { screen: map(SettingsScreen) },
  Error: { screen: map(ErrorScreen) },
},{
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
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateY }] };
    },
  }),
});
