import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { setMood } from '../../redux/modules/mood';
import {
  loadSongsForAllMoods2,
  loadSongsForMoodId2,
  loadSharedSongQueue,
  getCurrentTrackSelector,
} from '../../redux/modules/queue';
import MoodList from './components/mood-list';
import MoodLeftHeader from '../../components/headers/MoodLeftHeader';
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

  getContent = () => {
    if (this.props.loading || this.props.navvingToPlayScreen) {
      return (
        <ActivityIndicator
          color='black'
          size='large'
          animating
          style={{ flex: 10 }}
        />
      );
    }

    if (!this.props.loading && this.props.moods.length) {
      return (
        <MoodList
          featuredSong={this.props.featuredSong}
          loadSongsForMoodId={this.props.loadSongsForMoodId2}
          loadSongsForAllMoods={this.props.loadSongsForAllMoods2}
          loadSharedSongQueue={this.props.loadSharedSongQueue}
          setMood={this.props.setMood}
          moods={this.props.moods}
          selected={this.props.mood}
        />
      );
    }
    return null;
  };

  render = () => (
    <View style={styles.container} testID='MoodScreen'>
      <MoodLeftHeader title="Discover" />
      <View style={styles.flatListContainer} testID="MoodScreen-MoodsListContainer">
        { this.getContent() }
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  featuredSong: state.mood.featuredSong,
  selected: state.mood.selected,
  navvingToPlayScreen: state.queue.navvingToPlayScreen,
  curTrack: getCurrentTrackSelector(state),
});

const mapDispatchToProps = {
  setMood,
  loadSharedSongQueue,
  loadSongsForAllMoods2,
  loadSongsForMoodId2,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
