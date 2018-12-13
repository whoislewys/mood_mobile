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
} from 'react-native';
import { NavigationRoute } from 'react-navigation';
import Images from '@assets/images';
import { loadLeaderboardSongs } from '../../redux/modules/leaderboard';

/*
****
adapted from:
https://medium.com/@sxia/how-to-customize-tab-bar-in-react-navigation-a0dc6d4d7e61
****
*/

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    width,
    backgroundColor: '#666666',
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
    // navigationStateIndex = null;

    playButton = () => {
      if (this.props.playing) {
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
      return (
        <View style={[styles.tabBar, { style }]}>
          {tabBarButtons}
        </View>
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
