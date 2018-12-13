import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import Images from '@assets/images';
import { connect } from 'react-redux';
import LeaderboardRow from './components/leaderboardRow';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class LeaderboardScreen extends Component {
  // when you press the leaderboard button,
  // want something to happen similar to when you press moodIcon
  // loadArtists api call, render spinner until artists load
  keyExtractor = song => song.id.toString();

  _renderItem = ({ item }) => <LeaderboardRow
  leaderboardSong={ item }
  >
    </LeaderboardRow>

  render = () => {
    return (this.props.leaderboardSongs.length
      ? (
        <FlatList
          data={this.props.leaderboardSongs}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          >
        </FlatList>
      )
      : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
    );
  }
}

const mapStateToProps = state => ({
  leaderboardSongs: state.leaderboard.leaderboardSongs, // state/loaderboard.leaderboardSongs get the leaderboardSongs prop off the leaderboardSongs reducer's action
});

export default connect(mapStateToProps)(LeaderboardScreen);
