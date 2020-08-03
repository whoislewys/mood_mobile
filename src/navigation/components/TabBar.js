import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationRoute } from 'react-navigation';
import Images from '@assets/images';
import GestureRecognizer from 'react-native-swipe-gestures';
import PlayBar from '../../components/playbar';
import { loadPlaylists, loadSavedSongs } from '../../redux/modules/playlists';
import {
  handlePlayPress,
  skipToNext,
  skipToPrevious,
  getCurrentTrackSelector,
} from '../../redux/modules/queue';
import { loadEvents } from '../../redux/modules/events';
import { dimensions } from '../../assets/styles';

const { width } = dimensions;

const styles = StyleSheet.create({
  bottomBarsContainer: {
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    height: '15%',
  },
  playbarContainer: {
    flex: 45,
  },
  tabBar: {
    flex: 50,
    height: '100%',
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13.5,
    backgroundColor: '#FFFFFF',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    // careful changing elevation, it interacts with playbar closely
    elevation: 10,
    shadowOpacity: 0.17,
    shadowRadius: 0.2,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
  tabBarButton: {
    flex: 1,
    marginTop: '9%',
    height: 55,
  },
  tabBarButtonText: {
    paddingTop: 22,
    fontSize: 12,
    textAlign: 'center',
  },
  icon: {
    height: 23,
    width: 23,
    alignSelf: 'center',
  },
});

const TabBar = class TabBar extends Component {
  _handlePlayPress = () => {
    if (!this.props.queue.length) {
      Alert.alert('Let\'s pick a mood first! 🎧');
      return;
    }
    this.props.handlePlayPress();
  };

  renderIcon = ({ tintColor, label }) => {
    if (label === 'Mood') {
      return <Image source={Images.home} style={[styles.icon, { tintColor }]} />;
    }
    if (label === 'Leaderboard') {
      return <Image source={Images.leaderboard} style={[styles.icon, { tintColor }]} />;
    }
    if (label === 'Events') {
      return <Image source={Images.events} style={[styles.icon, { tintColor }]} />;
    }
    if (label === 'MyMusic') {
      return <Image source={Images.myMusic} style={[styles.icon, { tintColor }]} />;
    }
    return <View />;
  };

  renderTabBarButton = (route: NavigationRoute, navIndex) => {
    // This function makes a button for each specified route
    const {
      navigation,
      // renderIcon,
      activeTintColor,
      inactiveTintColor,
      getLabelText,
    } = this.props;
    const currentIndex = navigation.state.index;
    const focused = navIndex === currentIndex;
    const tintColor = focused ? activeTintColor : inactiveTintColor;
    const label = getLabelText({ route, focused: currentIndex === navIndex, index: navIndex });
    return (
      <TouchableOpacity
        testID={`TabBarButton-${route.key}`}
        accessible={false}
        key={route.key}
        style={styles.tabBarButton}
        activeOpacity={1}
        onPress={() => {
          if (currentIndex !== navIndex) {
            const navRouteName = navigation.state.routes[navIndex].routeName;
            if (navRouteName === 'Leaderboard') {
              navigation.navigate(route.routeName);
            } else if (navRouteName === 'Events') {
              this.props.loadEvents();
              navigation.navigate(route.routeName);
            } else if (navRouteName === 'MyMusic') {
              // this call also loads all playlists for cur user,
              // because 'Saved Songs' is just a playlist with a special name
              // this.props.loadSavedSongs();
              navigation.navigate(route.routeName);
            } else {
              navigation.navigate(route.routeName);
            }
          }
        }}
      >
        {this.renderIcon({
          tintColor,
          label,
        })}
        {/*<Text style={[styles.tabBarButtonText]}>*/}
        {/*{label}*/}
        {/*</Text>*/}
      </TouchableOpacity>
    );
  };

  navigateToPlayscreenFromPlaybar() {
    if (!this.props.queue.length) {
      Alert.alert('Let\'s pick a mood first! 🎧');
      return;
    }
    this.props.navigation.navigate({
      routeName: 'Play',
      params: {
        parentScreen: 'Playbar',
        visible: false,
        // dont remember why this moodscreen prop even exists
        moodscreen: this._navigateToLeaderboardScreen,
      },
    });
  }

  render = () => {
    const { navigation } = this.props;
    const tabBarButtons = [];

    // add buttons to bottom tab bar
    for (let i = 0; i < navigation.state.routes.length; i++) {
      // start at tabNavigator screen 3 | screens are numbered in app-navigator.js
      tabBarButtons.push(this.renderTabBarButton(navigation.state.routes[i], i));
    }

    return (
      <GestureRecognizer
        testID='BottomBarsContainer'
        style={styles.bottomBarsContainer}
        onSwipeUp={() => this.navigateToPlayscreenFromPlaybar()}
        onSwipeRight={() => this.props.skipToPrevious()}
        onSwipeLeft={() => this.props.skipToNext()}
      >
        <View
          testID='PlaybarContainer'
          style={styles.playbarContainer}
        >
          <PlayBar
            playbackState={this.props.playbackState}
            handlePlayPress={this._handlePlayPress}
            curTrack={this.props.curTrack}
            navigateToPlayscreenFromPlaybar={() => this.navigateToPlayscreenFromPlaybar()}
            navigation={this.props.navigation} // add navigation here to push it down the the star component in playbar
          />
        </View>
        <View
          testID='TabBar'
          style={styles.tabBar}
          {...this.props}
        >
          {tabBarButtons}
        </View>
      </GestureRecognizer>
    );
  }
};

const mapStateToProps = state => ({
  queue: state.queue.queue,
  curTrack: getCurrentTrackSelector(state),
  playbackState: state.queue.playbackState,
  playlists: state.playlists.playlists,
});

const mapDispatchToProps = {
  handlePlayPress,
  loadEvents,
  loadPlaylists,
  loadSavedSongs,
  skipToNext,
  skipToPrevious,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
