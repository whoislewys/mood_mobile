import React from 'react';
import { Easing, Animated } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/splash';
import ErrorScreen from '../screens/error';
import SettingsScreen from '../screens/settings';
import MoodScreen from '../screens/mood';
import LeaderboardScreen from '../screens/leaderboard';
import EventsScreen from '../screens/events';
import LibraryScreen from '../screens/savedSongs';
import PlaylistsScreen from '../screens/playlists';
import PlayScreen from '../screens/play';
import LoginScreen from '../screens/login';
import TabBar from './components/TabBar';
import { colors } from '../assets/styles';
import MoodLeftHeaderWithSettingsButton
  from '../components/headers/MoodLeftHeaderWithSettingsButton';
import PlaylistDetailScreen from '../screens/playlistDetail';
import PlaylistModal from '../screens/playlistModal';

const map = SomeComponent => class SomeClass extends React.Component {
    // utility function to map screenProps to and navigation params to regular props
    render = () => {
      const { screenProps } = this.props;
      // delete this.props.screenProps; // for some reason not working
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} {...screenProps} />;
    }
};

const TabBarComponent = props => <TabBar {...props} />;


// https://reactnavigation.org/docs/en/2.x/headers.html
const PlaylistNavigator = createStackNavigator({
  Playlists: { screen: map(PlaylistsScreen) },
}, {
  navigationOptions: {
    header: null,
  },
});

const MyMusicNavigator = createMaterialTopTabNavigator({
  Songs: { screen: map(LibraryScreen) },
  Playlists: PlaylistNavigator,
},
{
  tabBarOptions: {
    activeTintColor: colors.black,
    inactiveTintColor: colors.gray,
    indicatorStyle: {
      backgroundColor: colors.black,
      alignSelf: 'center',
    },
    style: {
      backgroundColor: '#fff',
    },
  },
});

const MyMusicNavigatorWithHeader = createStackNavigator({
  MyMusic: MyMusicNavigator,
}, {
  navigationOptions: {
    header: props => <MoodLeftHeaderWithSettingsButton {...props} title='My Music' />,
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
});

const TabNavigator = createBottomTabNavigator({
  Mood: { screen: map(MoodScreen) },
  Leaderboard: { screen: map(LeaderboardScreen) },
  Events: { screen: map(EventsScreen) },
  MyMusic: MyMusicNavigatorWithHeader,
}, {
  tabBarOptions: {
    activeTintColor: 'rgba(0, 0, 0, 1)',
    inactiveTintColor: 'rgba(0, 0, 0, 0.21)',
    activeBackgroundColor: 'red',
  },
  tabBarComponent: props => <TabBarComponent {...props} />,
});

export default createStackNavigator({
  Splash: { screen: map(SplashScreen) },
  Home: TabNavigator,
  Play: { screen: map(PlayScreen) },
  PlaylistDetail: { screen: map(PlaylistDetailScreen) },
  Login: { screen: map(LoginScreen) },
  Error: { screen: map(ErrorScreen) },
  Settings: { screen: map(SettingsScreen) },
  PlaylistModal: { screen: map(PlaylistModal) },
}, {
  cardStyle: {
    backgroundColor: 'transparent',
  },
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
