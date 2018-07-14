import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from 'react-native-splash-screen'

import { setMood } from '../../redux/modules/mood';

import Background from '../../components/background';
import MoodList from './components/mood-list';
import Mood from './components/mood';
import Playbar from '../../components/playbar';

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

class MoodScreen extends Component {
  componentDidMount = () => {
    StatusBar.setBarStyle('dark-content', true);
    // this.props.appLoaded(true);
  }

  navigateToPlayScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Play',
      params: { ...params }
    });
  };

  navigateToSettingsScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Settings',
      params: { ...params }
    });
  };

  _playbarGo = () => {
    this.navigateToPlayScreen();
  }

  _getMusicBar = () => {
    // if(this.props.playQueue.length > 0) {
    //   return (
    //     <View style={styles.footer}>
    //       <Playbar
    //         track={this.props.playQueue[this.props.currentTrack]}
    //         handlePlayPress={this.props.handlePlayPress}
    //         playing={this.props.playing}
    //         go={this._playbarGo}
    //       />
    //     </View>
    //   );
    // }
  }

  _getContent = () => {
    if(!this.props.loading) {
      return (
          <MoodList
            moods={this.props.moods}
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

const mapStateToProps = state => {
  return {
    moods: state.mood.moods,
    mood: state.mood.selected
  };
};

const mapDispatchToProps = {
  setMood
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
