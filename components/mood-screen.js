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

import Images from '@assets/images.js';
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
    // borderTopWidth: 2,
    // borderTopColor: '#ddd'
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
    this.props.appLoaded();
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

  state = {
    mood: -1,
    loading: false
  };

  setMood = (index) => {
    this.setState({ mood: index }, () => {
      this._onGo(index);
    });
  }

  _onGo = (index) => {
    this.setState({loading: true});
    let url = `http://api.moodindustries.com/api/v1/moods/${this.props.moods[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;
    // let url = `http://localhost:3000/api/v1/moods/${this.props.moods[this.state.mood].id}/songs/?t=EXVbAWTqbGFl7BKuqUQv`;

    fetch(url)
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });
        this.props.setPlayQueue(list);

        const art_url = list[0].art_url;

        const prefetchTask = Image.prefetch(art_url);
        prefetchTask.then(() => {
          console.log(`✔ First Prefetch OK - ${list[0].album_name}`);
          this.setState({loading: false});
          this.navigateToPlayScreen({mood: this.props.moods[this.state.mood]});
        }, () => {
          console.log(`✘ Prefetch failed - ${list[0].album_name}`);
          this.setState({loading: false});
          this.navigateToPlayScreen({mood: this.props.moods[this.state.mood]});
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _playbarGo = () => {
    this.navigateToPlayScreen({mood: this.props.moods[this.state.mood]})
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
    if(!this.state.loading) {
      return <MoodList moods={this.props.moods} setMood={this.setMood} selected={this.state.mood} navigate={this.navigateToSettingsScreen}/>;
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
