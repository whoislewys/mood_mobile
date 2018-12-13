/* eslint react/display-name: 0, import/no-extraneous-dependencies: 0 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import SplashScreen from '../screens/splash';
import MoodScreen from '../screens/mood';
import PlayScreen from '../screens/play';
import LeaderboardScreen from '../screens/leaderboard';
import EventsScreen from '../screens/events';
import SettingsScreen from '../screens/settings';
import ErrorScreen from '../screens/error';
import TabBar from './components/TabBar';

const map = SomeComponent => class SomeClass extends React.Component {
    render = () => {
      const screenProps = this.props.screenProps;
      delete this.props.screenProps; // for some reason not working
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} {...screenProps} />;
    }
};

const TabBarComponent = props => <TabBar {...props} />;

export default createBottomTabNavigator({
  Splash: { screen: map(SplashScreen) },
  Error: { screen: map(ErrorScreen) },
  Settings: { screen: map(SettingsScreen) },
  Mood: { screen: map(MoodScreen) },
  Play: { screen: map(PlayScreen) },
  Events: { screen: map(EventsScreen) },
  Leaderboard: { screen: map(LeaderboardScreen) },
}, {
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: 'rgba(255,255,255,.99)',
    inactiveTintColor: 'rgba(255,255,255,.2)',
    activeBackgroundColor: 'red',
  },
  tabBarComponent: props => <TabBarComponent
  {...props}
  />,
});

// supply this with a custom tabbar component https://stackoverflow.com/questions/47533940/can-react-navigation-add-costom-button-on-the-tab-navigator-like-the-pictures
