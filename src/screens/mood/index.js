import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { setMood } from '../../redux/modules/mood';
import { loadSongsForMoodId } from '../../redux/modules/queue';
import MoodList from './components/mood-list';

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
    height: 20,
  },
});

class MoodScreen extends Component {
  componentDidMount = () => {
    StatusBar.setBarStyle('dark-content', true);
    SplashScreen.hide();
  }

  navigateToMoodScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Mood',
      params: { ...params, visible: true },
    });
  }

  navigateToPlayScreenFromMoodScreen = (params = {}) => {
    const currentScreenName = 'MoodScreen';
    this.props.navigation.navigate({
      routeName: 'Play',
      params: {
        ...params,
        parentScreen: currentScreenName,
        visible: false,
        moodscreen: this.navigateToMoodScreen,
      },
    });
  };

  navigateToSettingsScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Settings',
      params: {
        ...params,
        playscreen: this.navigateToPlayScreenFromPlaybar,
        moodscreen: this.navigateToMoodScreen,
        visible: true,
      },
    });
  };

  navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, playscreen: this.navigateToPlayScreenFromPlaybar, visible: true },
    });
  };

  getContent = () => {
    if (!this.props.loading) {
      return (
          <MoodList
            loadSongsForMoodId={this.props.loadSongsForMoodId}
            setMood={this.props.setMood}
            moods={this.props.moods}
            selected={this.props.mood}
            playing={this.props.playing}
            handlePlayPress={this.props.handlePlayPress}
            settings={this.navigateToSettingsScreen}
            playscreen={this.navigateToPlayScreenFromMoodScreen}
          />
      );
    }

    return (
      <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
    );
  }

  render = () => (
      <View style={styles.container}>
        <View style={styles.moodList}>
          { this.getContent() }
        </View>
      </View>
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
});

const mapDispatchToProps = {
  loadSongsForMoodId,
  setMood,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
