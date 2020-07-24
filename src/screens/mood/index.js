import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { spacing } from '../../assets/styles';
// import MoodLeftHeaderWithSettingsButton from '../../components/headers/MoodLeftHeaderWithSettingsButton';
import MoodLeftHeader from '../../components/headers/MoodLeftHeader';
import { tileConstants } from '../../redux/constants';
import { setMood } from '../../redux/modules/mood';
import { loadSharedSongQueue, loadSongsForAllMoods, loadSongsForMoodId } from '../../redux/modules/queue';
import MoodList from './components/mood-list';

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
  timesNavved = 0;

  constructor(props) {
    super(props);
    this.state = {
      isNavigating: false,
    };
  }

  componentDidMount = () => {
    SplashScreen.hide();
  };

  componentDidUpdate = () => {
    if (this.state.isNavigating) {
      if (this.props.queue.length && this.props.curTrack != null && this.props.track != null) {
        this.navigateToPlayScreenFromMoodScreen();
        this.timesNavved = 0;
        this.setState({ isNavigating: false });
      }
    }
  }

  playMusicForMoodTile = async (moodObj) => {
    // show loading spinner
    this.setState({ isNavigating: true });

    // kick off loading actions
    if (moodObj.id === tileConstants.MYSTERY) {
      const ids = this.props.moods.map(mood => mood.id);
      await this.props.loadSongsForAllMoods(ids);
    } else if (moodObj.id === tileConstants.FEATURED_SONG) {
      await this.props.loadSharedSongQueue(this.props.featuredSong);
    } else {
      await this.props.loadSongsForMoodId(moodObj.id);
    }
  };

  clearMoodLoading = () => {
    this.setState({ isNavigating: false });
  };

  navigateToPlayScreenFromMoodScreen = async (params = {}) => {
    if (this.timesNavved === 0) {
      this.timesNavved++;
      const currentScreenName = 'MoodScreen';
      console.warn('navving to play screen from modd');
      const visible = false;
      this.props.navigation.navigate({
        routeName: 'Play',
        params: {
          ...params,
          clearMoodLoading: this.clearMoodLoading,
          parentScreen: currentScreenName,
          visible,
        },
      });
    }
  };

  navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, playscreen: this.navigateToPlayScreenFromPlaybar, visible: true },
    });
  };

  getContent = () => {
    if (this.state.isNavigating || this.props.loading) {
      return (
        <ActivityIndicator
          color='black'
          size='large'
          animating
          style={{flex: 10}}
        />
      );
    }

    if (!this.props.loading && this.props.moods.length) {
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
          playMusicForMoodTile={this.playMusicForMoodTile}
        />
      );
    }


    return null;
  };

  render = () => (
    <View style={styles.container} testID='MoodScreen'>
      <MoodLeftHeader title="Discover" />
      {/* <MoodLeftHeaderWithSettingsButton title='Discover' navigation={this.props.navigation} /> */}
      <View style={styles.flatListContainer} testID="MoodScreen-MoodsListContainer">
        {this.getContent()}
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
