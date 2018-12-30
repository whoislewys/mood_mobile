import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Images from '@assets/images';
import { connect } from 'react-redux';
import LeaderboardRow from './components/leaderboardRow';
import Header from './components/header';

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
  // when you press the leaderboard button,
  // want something to happen similar to when you press moodIcon
  // loadArtists api call, render spinner until artists load
  keyExtractor = song => song.id.toString();

  _renderItem = ({ item }) => <LeaderboardRow
  leaderboardSong={ item }
  >
    </LeaderboardRow>

  getLeaderBoard = () => {
    return (
      this.props.leaderboardSongs.length
        ? (
          <FlatList
            data={this.props.leaderboardSongs}
            renderItem={this._renderItem}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={Header({ headerText: 'Leaderboard', showLogo: true })}
            >
          </FlatList>
        )
        : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
    );
  }

  render = () => (
    <View style={styles.background}>
      {this.getLeaderBoard()}
    </View>
  )
}

const mapStateToProps = state => ({
  leaderboardSongs: state.leaderboard.songs, // state/loaderboard.leaderboardSongs get the leaderboardSongs prop off the leaderboardSongs reducer's action
});

export default connect(mapStateToProps)(LeaderboardScreen);
