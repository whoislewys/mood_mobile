import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Images from '@assets/images';
import { LEADERBOARDS } from '../../redux/constants';
import LeaderboardRow from './components/leaderboardRow';
import { loadLeaderboardSongs } from '../../redux/modules/leaderboard';
import { loadQueueStartingAtSong } from '../../redux/modules/queue';
import { spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leaderboardContainer: {
    paddingTop: spacing.sm,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginHorizontal: spacing.sm,
  },
  moodLogo: {
    alignSelf: 'center',
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
});

class LeaderboardScreen extends Component {
  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.componentWillFocus);
  }

  componentWillFocus = () => {
    const leaderboardType = this.props.navigation.state.key;
    this.props.loadLeaderboardSongs(LEADERBOARDS[leaderboardType]);
  };

  _navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, visible: true },
    });
  };

  _handleLeaderboardRowPress = async (pressedLeaderboardSongIndex, pressedLeaderboardSongId) => {
    await this.props.loadQueueStartingAtSong(pressedLeaderboardSongIndex, pressedLeaderboardSongId, this.props.leaderboardSongs);
  };

  keyExtractor = song => song.id.toString();

  _renderItem = ({ item, index }) => (
    <LeaderboardRow
      leaderboardSong={item}
      index={index}
      _handleLeaderboardRowPress={this._handleLeaderboardRowPress}
    />
  );


  topComponent = () => (
    <Image source={Images.moodLogo} style={styles.moodLogo} />
  );

getLeaderBoard = () => {
  if (this.props.navvingToPlayScreen) {
    return (
      <ActivityIndicator
        color='black'
        size='large'
        animating
        style={{ flex: 10 }}
      />
    );
  }

  return this.props.leaderboardSongs.length
    ? (
      <FlatList
        data={this.props.leaderboardSongs}
        renderItem={this._renderItem}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
        showsVerticalScrollIndicator={false}
      />
    )
    : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />;
};

  render = () => (
    <View style={styles.background}>
      <View style={styles.leaderboardContainer}>
        {this.getLeaderBoard()}
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  navvingToPlayScreen: state.queue.navvingToPlayScreen,
  leaderboardSongs: state.leaderboard.songs,
  queue: state.queue.queue,
});

const mapDispatchToProps = {
  loadLeaderboardSongs,
  loadQueueStartingAtSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen);
