// adapted from: https://medium.com/@sxia/how-to-customize-tab-bar-in-react-navigation-a0dc6d4d7e61
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { NavigationRoute } from 'react-navigation';
import Images from '@assets/images';
import { loadLeaderboardSongs } from '../../redux/modules/leaderboard';

const TAB_BAR_OFFSET = 77;
const SLIDE_DURATION = 100;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 13.5,
    paddingRight: 13.5,
    height: TAB_BAR_OFFSET,
    width,
    backgroundColor: '#FFFFFF',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    elevation: 1,
    shadowOpacity: 0.40,
    shadowRadius: 0.9,
    shadowOffset: {
      width: 0,
      height: -0.3,
    },
  },
  playPauseButton: {
    height: 33,
    width: 33,
    marginTop: -8.5,
    marginLeft: 22,
    marginRight: 22,
  },
  tabBarButton: {
    flex: 1,
    marginTop: 23,
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
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(TAB_BAR_OFFSET),
      fadeAnim: new Animated.Value(1),
    };
  }

  componentDidUpdate(prevProps) {
    const prevRoute = prevProps.navigation.state.routes[prevProps.navigation.state.index];
    const newRoute = this.props.navigation.state.routes[this.props.navigation.state.index];
    if (prevRoute !== newRoute) {
      const prevParams = prevRoute.params;
      const wasVisible = !prevParams || prevParams.visible;

      const newParams = newRoute.params;
      const isVisible = !newParams || newParams.visible;

      if (wasVisible && !isVisible) {
        // console.log('animating down!');
        Animated.timing(this.state.offset, { toValue: 0, duration: SLIDE_DURATION }).start();
      } else if (isVisible && !wasVisible) {
        // console.log('animating up!');
        Animated.timing(this.state.offset, { toValue: TAB_BAR_OFFSET, duration: SLIDE_DURATION }).start();
      }
    }
  }

  playButton = () => {
    if (this.props.playbackState === 'playing') {
      return (
        <TouchableOpacity onPress={this.props.screenProps.handlePlayPress}>
          <Image source={Images.navPauseButton} style={styles.playPauseButton} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.props.screenProps.handlePlayPress}>
        <Image source={Images.navPlayButton} style={styles.playPauseButton} />
      </TouchableOpacity>
    );
  }

  renderIcon = ({ tintColor, label }) => {
    if (label === 'Mood') {
      return <Image source={Images.discover} style={[styles.icon, { tintColor }]} />;
    }
    if (label === 'Play') {
      return <Image source={Images.player} style={[styles.icon, { tintColor }]} />;
    }
    if (label === 'Leaderboard') {
      return <Image source={Images.leaderboard} style={[styles.icon, { tintColor }]} />;
    }
    if (label === 'Events') {
      return <Image source={Images.events} style={[styles.icon, { tintColor }]} />;
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
        key={route.key}
        style={styles.tabBarButton}
        activeOpacity={1}
        onPress={() => {
          if (currentIndex !== navIndex) {
            const navRouteName = navigation.state.routes[navIndex].routeName;
            if (navRouteName === 'Leaderboard') {
              this.props.loadLeaderboardSongs();
              navigation.navigate(route.routeName);
            } else if (navRouteName === 'Play') {
              if (!this.props.queue.length) {
                Alert.alert('Pick a song first!');
              } else {
                navigation.navigate(route.routeName);
              }
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
        {/* <Text style={[styles.tabBarButtonText, { color }]}>
          {label}
        </Text> */}
      </TouchableOpacity>
    );
  }

  render = () => {
    const { navigation, style } = this.props;
    const tabBarButtons = [];
    for (let i = 3; i < navigation.state.routes.length; i++) {
      tabBarButtons.push(this.renderTabBarButton(navigation.state.routes[i], i));
      if (i === 4) {
        tabBarButtons.push(
          <View key='the-play-button'>
            {this.playButton()}
          </View>,
        );
      }
    }
    return (
      <Animated.View {...this.props} style={[styles.tabBar, style, { height: this.state.offset }]}>
        {tabBarButtons}
      </Animated.View>
    );
  }
};

const mapStateToProps = state => ({
  queue: state.queue.queue,
  playbackState: state.queue.playback,
});

const mapDispatchToProps = {
  loadLeaderboardSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
