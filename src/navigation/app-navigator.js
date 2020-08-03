import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Images from '@assets/images';

import ErrorScreen from '../screens/error';
import FullScreenWebView from '../screens/webview';
// import EventsScreen from '../screens/events';
import LeaderboardScreen from '../screens/leaderboard';
import LoginScreen from '../screens/login';
import LibraryScreen from '../screens/savedSongs';
import MoodScreen from '../screens/mood';
import PlaylistDetailScreen from '../screens/playlistDetail';
import PlaylistModal from '../screens/playlistModal';
import PlaylistsScreen from '../screens/playlists';
import PlayScreen from '../screens/play';
import SettingsScreen from '../screens/settings';
import SplashScreen from '../screens/splash';
import TabBar from './components/TabBar';

import MoodLeftHeaderWithSettingsButton
  from '../components/headers/MoodLeftHeaderWithSettingsButton';
import { colors, fonts } from '../assets/styles';
import MoodImageOnTopHeader from '../components/headers/MoodImageOnTopHeader';

const styles = StyleSheet.create({
  moodLogo: {
    alignSelf: 'center',
    width: 168,
    height: 100,
    resizeMode: 'contain',
  },
});

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
    labelStyle: {
      fontSize: 13,
      fontFamily: fonts.primary,
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

const leaderboardNavigator = createMaterialTopTabNavigator({
  Daily: { screen: map(LeaderboardScreen) },
  Weekly: { screen: map(LeaderboardScreen) },
  'All Time': { screen: map(LeaderboardScreen) },
},
{
  navigationOptions: {
    tabBarTestID: 'LeaderboardTabBar',
  },
  tabBarOptions: {
    activeTintColor: colors.black,
    inactiveTintColor: colors.gray,
    indicatorStyle: {
      backgroundColor: colors.black,
      alignSelf: 'center',
    },
    labelStyle: {
      fontSize: 13,
      fontFamily: fonts.primary,
    },
    style: {
      backgroundColor: '#fff',
    },
  },
});


const topComponent = () => (
  <Image source={Images.moodLogo} style={styles.moodLogo} />
);

const leaderboardNavigatorWithHeader = createStackNavigator({
  Leaderboard: leaderboardNavigator,
}, {
  navigationOptions: {
    header: props => (
      <MoodImageOnTopHeader
        {...props}
        title='Leaderboard'
        titleIsCentered={false}
        topComponent={topComponent()}
      />
    ),
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
});

const TabNavigator = createBottomTabNavigator({
  Mood: { screen: map(MoodScreen) },
  Leaderboard: leaderboardNavigatorWithHeader,
  // Events: { screen: map(EventsScreen) },
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
  // this screen will get rendered first!!!
  Splash: { screen: map(SplashScreen) },
  // these can be navigated to from anywhere
  FullScreenWebView: { screen: map(FullScreenWebView) },
  Home: TabNavigator,
  Play: { screen: map(PlayScreen) },
  Login: { screen: map(LoginScreen) },
  Error: { screen: map(ErrorScreen) },
  Settings: { screen: map(SettingsScreen) },
  PlaylistDetail: { screen: map(PlaylistDetailScreen) },
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
      const height = layout.initHeight;
      const width = layout.initWidth;

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      if (route.routeName === 'Settings') {
        return { opacity, transform: [{ translateX }] };
      }
      if (route.routeName === 'PlaylistModal' || route.routeName === 'LoginScreen') {
        return { opacity, transform: [{ translateY: 0 }, { translateX: 0 }] };
      }
      return { opacity, transform: [{ translateY }] };
    },
  }),
});
