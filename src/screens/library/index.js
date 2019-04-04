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
  leaderboardContainer: {
    backgroundColor: '#fff',
    paddingLeft: 21,
    paddingRight: 21,
  },
};

class SavedSongs extends Component {
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
        parentScreen: 'Leaderboard',
        visible: false,
        // dont remember why this moodscreen prop even exists
        moodscreen: this._navigateToLeaderboardScreen,
      },
    });
  }

  _handleLeaderboardRowPress = async (pressedLeaderboardSongIndex) => {
    this.props.loadLeaderboardSongQueue(pressedLeaderboardSongIndex);
    this._navigateToPlayScreen();
  }

  keyExtractor = song => song.id.toString();

  _renderItem = ({ item, index }) => {
    return (
      <LeaderboardRow
        leaderboardSong={item}
        index={index}
        _handleLeaderboardRowPress={this._handleLeaderboardRowPress}
      />
    );
  };

  getLeaderBoard = () => (
    this.props.leaderboardSongs.length
      ? (
        <FlatList
          // TODO: figure out the sticky header components
          data={this.props.leaderboardSongs}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={<View style={{ height: 0, marginTop: 70 }} />}
          ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      )
      : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
  )

  render = () => (
    <View style={styles.background}>
      <View style={styles.leaderboardContainer}>
        {this.getLeaderBoard()}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedSongs);
