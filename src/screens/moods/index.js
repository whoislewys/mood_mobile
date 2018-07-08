import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationActions } from 'react-navigation';

import Background from './background';
import MoodList from './mood-screen-components/mood-list';
import Mood from './mood-screen-components/mood';
import Playbar from './main-components/playbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  padding: {
    flex: 25,
  },
  moodList: {
    flex: 90,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 2,
    marginRight: 2,
  },
  footer: {
    flex: 8,
    backgroundColor: 'rgba(102, 102, 102, 1)',
  },
  goArrow: {
    resizeMode: 'stretch',
    height: 20
  }
});

export default class MoodScreen extends React.Component {
  componentWillMount = () => {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidMount = () => {
    this.props.appLoaded(true);
  }

  navigateToPlayScreen = (params) => {
    const navigate = NavigationActions.navigate({
      routeName: 'Play',
      params: { ...params }
    });

    this.props.navigation.dispatch(navigate);
  };

  navigateToSettingsScreen = (params = {}) => {
    const navigate = NavigationActions.navigate({
      routeName: 'Settings',
      params: { ...params }
    });

    this.props.navigation.dispatch(navigate);
  };

  _playbarGo = () => {
    this.navigateToPlayScreen();
  }

  _getMusicBar = () => {
    if(this.props.playQueue.length > 0) {
      return (
        <View style={styles.footer}>
          <Playbar
            track={this.props.playQueue[this.props.currentTrack]}
            handlePlayPress={this.props.handlePlayPress}
            playing={this.props.playing}
            go={this._playbarGo}
          />
        </View>
      );
    }
  }

  _getContent = () => {
    if(!this.props.loading) {
      return (
          <MoodList
            moods={this.props.moodList}
            setMood={this.props.setMood}
            selected={this.props.mood}
            settings={this.navigateToSettingsScreen}
            playscreen={this.navigateToPlayScreen}
          />
        );
    } else {
      return (
        <ActivityIndicator color={'black'} size={'large'} animating={true} style={{flex: 10}}/>
      );
    }
  }

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.moodList}>
          { this._getContent() }
        </View>
        { this._getMusicBar() }
      </View>
    );
  }
}
