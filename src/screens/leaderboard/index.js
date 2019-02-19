import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
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

  _handleLeaderboardRowPress = async (pressedLeaderboardSong, selectedSongIndex) => {
    this.props.loadLeaderboardSongQueue(pressedLeaderboardSong, selectedSongIndex);
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
