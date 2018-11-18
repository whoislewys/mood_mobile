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

  navigateToPlayScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Play',
      params: { ...params },
    });
  };

  navigateToSettingsScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Settings',
      params: { ...params },
    });
  };

  getPlaybar = () => (this.props.queue && this.props.queue.queue.length
    ? (
        <Playbar
        track={this.props.currentTrack}
        playing={this.props.playing}
        playscreen={this.navigateToPlayScreen}
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
            moods={this.props.moods}
            selected={this.props.mood}
            settings={this.navigateToSettingsScreen}
            playscreen={this.navigateToPlayScreen}
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
  selected: state.mood.selected,
  queue: state.queue,
});

const mapDispatchToProps = {
  setMood,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
