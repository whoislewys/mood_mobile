import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { setMood } from '../../redux/modules/mood';
import { loadSongsForAllMoods, loadSongsForMoodId, loadSharedSongQueue } from '../../redux/modules/queue';
import MoodList from './components/mood-list';
import MoodLeftHeaderWithSettingsButton from '../../components/headers/MoodLeftHeaderWithSettingsButton';
import { spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    flex: 1,
    marginTop: spacing.sm * 0.731, // for some reason there's some padding on the moodlist i can't get rid of, so i hacked together this custom margin so it looks the same as the events screen
  },
});

class MoodScreen extends Component {
  componentDidMount = () => {
    SplashScreen.hide();
  };


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
          featuredSong={this.props.featuredSong}
          loadSongsForMoodId={this.props.loadSongsForMoodId}
          loadSongsForAllMoods={this.props.loadSongsForAllMoods}
          loadSharedSongQueue={this.props.loadSharedSongQueue}
          setMood={this.props.setMood}
          moods={this.props.moods}
          selected={this.props.mood}
          settings={this.navigateToSettingsScreen}
          playscreen={this.navigateToPlayScreenFromMoodScreen}
        />
      );
    }
    return null;
  };

  render = () => (
    <View style={styles.container}>
      <MoodLeftHeaderWithSettingsButton title='Discover' navigation={this.props.navigation} />
      <View style={styles.flatListContainer}>
        { this.getContent() }
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  featuredSong: state.mood.featuredSong,
  selected: state.mood.selected,
  queue: state.queue.queue,
  curTrack: state.queue.curTrack,
  track: state.queue.track,
});

const mapDispatchToProps = {
  setMood,
  loadSharedSongQueue,
  loadSongsForAllMoods,
  loadSongsForMoodId,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
