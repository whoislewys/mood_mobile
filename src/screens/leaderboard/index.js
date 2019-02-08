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
import { loadSpecificSongQueue, loadLeaderboardSongQueue } from '../../redux/modules/queue';

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

  _renderItem = ({ item, index }) => {
    console.log('leaderboard song for row: ', item);
    return (
    // TODO: Replace passing the leaderboardSongs to each leaderboard row with
    // TODO: passing an onClick handler that will lead songs for the row that is clicked
    <LeaderboardRow
      navigation={this.props.navigation}
      leaderboardSong={item}
      leaderboardSongs={this.props.leaderboardSongs}
      index={index}
      loadSpecificSongQueue={this.props.loadSpecificSongQueue}
      loadLeaderboardSongQueue={this.props.loadLeaderboardSongQueue}
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
});

const mapDispatchToProps = {
  loadSpecificSongQueue,
  loadLeaderboardSongQueue,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen);
