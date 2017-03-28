import React from 'react';
import { StackNavigator } from 'react-navigation';

import PlayScreen from './components/play-screen';
import MoodScreen from './components/mood-screen'
import SplashScreen from './components/splash-screen';

export default StackNavigator({
  Splash: { screen: SplashScreen },
  Mood: { screen: MoodScreen },
  Play: { screen: PlayScreen },
  initialRouteName: {
    screen: SplashScreen
  }
},{
  headerMode: 'none'
});
