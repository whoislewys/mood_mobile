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
import { loadLeaderboardSongs } from '../../redux/modules/leaderboard';
import MoodList from './components/mood-list';
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
    height: 20,
  },
});

class MoodScreen extends Component {
  componentDidMount = () => {
    StatusBar.setBarStyle('dark-content', true);
    SplashScreen.hide();
  }

  navigateToPlayScreenFromMoodScreen = (params = {}) => {
    const currentScreenName = 'MoodScreen';
    this.props.navigation.navigate({
      routeName: 'Play',
      params: { ...params, parentScreen: currentScreenName },
    });
  };

  navigateToPlayScreenFromPlaybar = (params = {}) => {
    const currentScreenName = 'Playbar';
    this.props.navigation.navigate({
      routeName: 'Play',
      params: { ...params, parentScreen: currentScreenName },
    });
  };

  navigateToSettingsScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Settings',
      params: { ...params, playscreen: this.navigateToPlayScreenFromPlaybar },
    });
  };

  navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, playscreen: this.navigateToPlayScreenFromPlaybar },
    });
  };

  getPlaybar = () => (this.props.queue && this.props.queue.queue.length
    ? (
        <Playbar
        track={this.props.currentTrack}
        playing={this.props.playing}
        playscreen={this.navigateToPlayScreenFromPlaybar}
        handlePlayPress={this.props.handlePlayPress}/>
    )
    : null
  )

  getContent = () => {
    if (!this.props.loading) {
      return (
          <MoodList
            loadSongsForMoodId={this.props.loadSongsForMoodId}
            setMood={this.props.setMood}
            loadLeaderboardSongs={this.props.loadLeaderboardSongs}
            moods={this.props.moods}
            selected={this.props.mood}
            track={this.props.currentTrack}
            playing={this.props.playing}
            handlePlayPress={this.props.handlePlayPress}
            settings={this.navigateToSettingsScreen}
            playscreen={this.navigateToPlayScreenFromMoodScreen}
            leaderboard={this.navigateToLeaderboardScreen}
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
        { this.getPlaybar() }
      </View>
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected, // state.mood.selected gets the selected prop from the state of the mood reducer's action
  queue: state.queue, // state.queue gets the entire state of the queue reducer's action
});

const mapDispatchToProps = {
  setMood,
  loadLeaderboardSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
