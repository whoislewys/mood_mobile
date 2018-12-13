import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { NavigationRoute } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import Images from '@assets/images';
import { loadLeaderboardSongs } from '../../redux/modules/leaderboard';

/*
****
adapted from:
https://medium.com/@sxia/how-to-customize-tab-bar-in-react-navigation-a0dc6d4d7e61
****
*/

const TAB_BAR_OFFSET = 200;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    width,
    backgroundColor: '#666666',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  playPauseButton: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
  },
  tabBarButton: {
    flex: 1,
    height: 50,
  },
  tabBarButtonText: {
    paddingTop: 22,
    fontSize: 12,
    textAlign: 'center',
  },
});

const TabBar = class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      fadeAnim: new Animated.Value(1),
    };
  }

  componentDidUpdate(prevProps) {
    const prevRoute = prevProps.navigation.state.routes[prevProps.navigation.state.index];
    const newRoute = this.props.navigation.state.routes[this.props.navigation.state.index];
    console.log('prevRoute: ', prevRoute);
    console.log('newRoute: ', newRoute);
    if (prevRoute !== newRoute) {
      const prevParams = prevRoute.params;
      const wasVisible = !prevParams || prevParams.visible;

      const newParams = newRoute.params;
      const isVisible = !newParams || newParams.visible;

      if (wasVisible && !isVisible) {
        console.log('animating down!');
        Animated.timing(this.state.offset, { toValue: TAB_BAR_OFFSET, duration: 200 }).start();
        // Animated.timing(this.state.fadeAnim, { toValue: 0, duration: 10000 }).start();
      } else if (isVisible && !wasVisible) {
        console.log('animating up!');
        Animated.timing(this.state.offset, { toValue: 0, duration: 200 }).start();
        // Animated.timing(this.state.offset, { toValue: 1, duration: 10000 }).start();
      }
    }
  }

  playButton = () => {
    if (this.props.playbackState === 'playing') {
      return (
        <TouchableOpacity onPress={this.props.screenProps.handlePlayPress}>
          <Image source={Images.pauseButtonWhite} style={styles.playPauseButton} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.props.screenProps.handlePlayPress}>
        <Image source={Images.playButtonWhite} style={styles.playPauseButton} />
      </TouchableOpacity>
    );
  }

  renderTabBarButton = (route: NavigationRoute, navIndex) => {
    // makes a button for each route
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      getLabelText,
    } = this.props;
    const currentIndex = navigation.state.index;
    const focused = navIndex === currentIndex;
    const tintColor = focused ? activeTintColor : inactiveTintColor;
    const color = currentIndex === navIndex ? activeTintColor : inactiveTintColor;
    const label = getLabelText({ route, focused: currentIndex === navIndex, index: navIndex });
    // you find more! https://github.com/react-navigation/react-navigation/issues/1059
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
        {renderIcon({
          route,
          tintColor,
          focused,
          index: navIndex,
        })}
        <Text style={[styles.tabBarButtonText, { color }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  render = () => {
    const { navigation, style } = this.props;
    // const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton.bind(this));
    // ^ is there a way to just map from 3:end so we dont have to for loop? ^
    const tabBarButtons = [];
    for (let i = 3; i < navigation.state.routes.length; i++) {
      tabBarButtons.push(this.renderTabBarButton(navigation.state.routes[i], i));
      if (i === 4) {
        // TODO: render usable playbutton here, then tabBarButtons.push(playButton);
        // see here for more https://itnext.io/react-native-tab-bar-is-customizable-c3c37dcf711f
        tabBarButtons.push(
          <View key='the-play-button'>
            {this.playButton()}
          </View>,
        );
      }
    }
    // console.log('offset: ', this.state.offset);
    const animationStyle = {
      transform: [{ translateY: this.state.offset }],
    };
    return (
      <Animated.View {...this.props} style={[styles.tabBar, style, animationStyle]}>
        {tabBarButtons}
      </Animated.View>
    );

    // return (
    //   <Animated.View style={[styles.tabBar, { bottom: this.state.offset }]}>
    //     <BottomTabBar {...this.props}/>
    //   </Animated.View>
    // );
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
