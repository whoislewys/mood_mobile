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

  navigateToPlayScreen = (params) => {
    console.log('attempting to navigate to playscreen!');
    this.props.navigation.navigate({
      routeName: 'Play',
      params: { ...params },
    });
  };

  navigateToSettingsScreen = (params = {}) => {
    console.log('attempting to go to settings screen!');
    this.props.navigation.navigate({
      routeName: 'Settings',
      params: { ...params },
    });
  };

  playbarGo = () => {
    this.navigateToPlayScreen();
  }

  getMusicBar = () => <View></View>


  getContent = () => {
    if (!this.props.loading) {
      return (
          <MoodList
            moods={this.props.moods}
            setMood={this.props.setMood}
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
        { this.getMusicBar() }
      </View>
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  mood: state.mood.selected,
});

const mapDispatchToProps = {
  setMood,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
