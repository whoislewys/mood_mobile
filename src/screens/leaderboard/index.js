import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Images from '@assets/images';
import LeaderboardRow from './components/leaderboardRow';
import MoodImageOnTopHeader from '../../components/headers/MoodImageOnTopHeader';
import { loadQueueStartingAtId } from '../../redux/modules/queue';
import { sendScoreDelta } from '../../redux/modules/score';
import { spacing } from '../../assets/styles';

const styles = {
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leaderboardContainer: {
    flex: 1,
    paddingTop: spacing.sm,
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
};

class LeaderboardScreen extends Component {
  _navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, visible: true },
    });
  };

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
  };

  _handleLeaderboardRowPress = async (pressedLeaderboardSongIndex) => {
    // this.props.loadLeaderboardSongQueue(pressedLeaderboardSongIndex);
    this.props.loadQueueStartingAtId(pressedLeaderboardSongIndex, this.props.leaderboardSongs);
    this._navigateToPlayScreen();
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

getLeaderBoard = () => (
  this.props.leaderboardSongs.length
    ? (
      <FlatList
        data={this.props.leaderboardSongs}
        renderItem={this._renderItem}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
        showsVerticalScrollIndicator={false}
      />
    )
    : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
);

  render = () => (
    <View style={styles.background}>
      <MoodImageOnTopHeader
        title='Leaderboard'
        titleIsCentered={false}
        topComponent={this.topComponent()}
      />
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
  // loadLeaderboardSongQueue,
  loadQueueStartingAtId,
  sendScoreDelta,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen);
