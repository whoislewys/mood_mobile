import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
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
      // delete this.props.screenProps; // for some reason not working
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} {...screenProps} />;
    }
};

const TabBarComponent = props => <TabBar {...props} />;

// TODO:
//  figure out swipe from navbar to open playscreen
const TabNavigator = createBottomTabNavigator({
  Splash: { screen: map(SplashScreen) },
  Error: { screen: map(ErrorScreen) },
  Settings: { screen: map(SettingsScreen) },
  Mood: { screen: map(MoodScreen) },
  Leaderboard: { screen: map(LeaderboardScreen) },
  Events: { screen: map(EventsScreen) },
}, {
  swipeEnabled: true,
  gesturesEnabled: true,
  tabBarOptions: {
    activeTintColor: 'rgba(0, 0, 0, 1)',
    inactiveTintColor: 'rgba(0, 0, 0, 0.21)',
    activeBackgroundColor: 'red',
  },
  tabBarComponent: props => <TabBarComponent {...props} />,
});

const AppNavigator = createStackNavigator({
  Home: TabNavigator,
  Play: { screen: map(PlayScreen) },
});

export default AppNavigator;
