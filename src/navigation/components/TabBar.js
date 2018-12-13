import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { NavigationRoute } from 'react-navigation';
import { loadLeaderboardSongs } from '../../redux/modules/leaderboard';

/*
****
adapted from:
https://medium.com/@sxia/how-to-customize-tab-bar-in-react-navigation-a0dc6d4d7e61
****
*/


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    height: 50,
  },
  tabBarButtonText: {
    paddingTop: 22,
    fontSize: 12,
  },
  tabBar: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 44,
    width,
    backgroundColor: '#666666',
  },
});

const TabBar = class TabBar extends Component {
    navigationStateIndex = null;

    renderTabBarButton = (route: NavigationRoute, navIndex) => {
      // makes a button for each route
      const {
        activeTintColor,
        inactiveTintColor,
        navigation,
        getLabelText,
        renderIcon,
      } = this.props;
      const currentIndex = navigation.state.index;
      const color = currentIndex === navIndex ? activeTintColor : inactiveTintColor;
      const label = getLabelText({ route, focused: currentIndex === navIndex, index: navIndex });
      // console.log('rendering screen w index: ', currentIndex);
      return (
        <TouchableOpacity
          onPress={() => {
            if (currentIndex !== navIndex) {
              const navRouteName = navigation.state.routes[navIndex].routeName;
              console.log('navigating to route ', navRouteName);
              if (navRouteName === 'Leaderboard') {
                console.log('loading leaderboard songs');
                this.props.loadLeaderboardSongs();
              }
              navigation.navigate(route.routeName);
            }
          }}
          style={styles.tabBarButton}
          key={route.routeName}
        >
          { renderIcon({
            route, tintColor: color, focused: currentIndex === navIndex, index: navIndex,
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
        }
      }
      return (
        <View style={[styles.tabBar, style]}>
          {tabBarButtons}
        </View>
      );
    }
};

const mapDispatchToProps = {
  loadLeaderboardSongs,
};

export default connect(null, mapDispatchToProps)(TabBar);
