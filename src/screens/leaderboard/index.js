import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Images from '@assets/images';
import * as TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import LeaderboardRow from './components/leaderboardRow';
import Header from './components/header';
import { loadLeaderboardSongQueue } from '../../redux/modules/queue';
import { sendScoreDelta } from '../../redux/modules/score';

const styles = {
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 21,
    marginRight: 21,
  },
};

class LeaderboardScreen extends Component {
  _navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, visible: true },
    });
  }

  _navigateToPlayScreen = () => {
    this.props.navigation.navigate({
      routeName: 'Play',
      params: {
        parentScreen: 'LeaderboardScreen',
        visible: false,
        // dont remember why this moodscreen prop even exists
        moodscreen: this._navigateToLeaderboardScreen,
      },
    });
  }

  _handleLeaderboardRowPress = async (pressedLeaderboardSong) => {
    // TODO: clean this shit up when we use thunk for trackPlayer controls
    // this.props.resetScore(this.props.sendScoreDelta, this.props.pressedLeaderboardSong);
    await TrackPlayer.reset();
    await TrackPlayer.add(this.props.leaderboardSongs);
    await TrackPlayer.skip(pressedLeaderboardSong.id);

    if (!this.props.queue.length) {
      await TrackPlayer.play();
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    // TODO: might have to clean up extra props (star prop) on the leaderboardSong object
    this.props.loadLeaderboardSongQueue(pressedLeaderboardSong, this.props.leaderboardSongs);
    this._navigateToPlayScreen();
  }

  keyExtractor = song => song.id.toString();

  _renderItem = ({ item, index }) => {
    return (
    <LeaderboardRow
      leaderboardSong={item}
      index={index}
      _handleLeaderboardRowPress={this._handleLeaderboardRowPress}
    >
    </LeaderboardRow>
    );
  };

  getLeaderBoard = () => (
    this.props.leaderboardSongs.length
      ? (
          <FlatList
            data={this.props.leaderboardSongs}
            renderItem={this._renderItem}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={Header({ headerText: 'Leaderboard', showLogo: true })}
            ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }}></View>}
            showsVerticalScrollIndicator={false}
            >
          </FlatList>
      )
      : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
  )

  render = () => (
    <View style={styles.background}>
      {this.getLeaderBoard()}
    </View>
  )
}

const mapStateToProps = state => ({
  leaderboardSongs: state.leaderboard.songs,
  queue: state.queue.queue,
});

const mapDispatchToProps = {
  loadLeaderboardSongQueue,
  sendScoreDelta,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen);
