import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Images from '@assets/images';
import { loadLeaderboardSongQueue, shufflePlay } from '../../redux/modules/queue';
import { addSongToDeleteList } from '../../redux/modules/savingSongs';
import { sendScoreDelta } from '../../redux/modules/score';
import SongRow from './components/songRow';
import { spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
  },
  shuffleButtonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: spacing.md, // TODO: replace with global margin
    marginBottom: spacing.md,
  },
  shuffleButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

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
  };

  _shuffleButton = () => (
    <View>
      <TouchableOpacity
        style={styles.shuffleButtonContainer}
        onPress={() => {
          this.props.shufflePlay(this.props.leaderboardSongs);
          this.props.navigation.navigate('Play');
        }}
      >
        <Image source={Images.shuffle} style={styles.shuffleButton} />
      </TouchableOpacity>
    </View>
  );

  _handleSongRowPress = async (pressedLeaderboardSongIndex) => {
    this.props.loadLeaderboardSongQueue(pressedLeaderboardSongIndex);
    this._navigateToPlayScreen();
  };

  keyExtractor = song => song.id.toString();

  _renderItem = ({ item, index }) => (
    <SongRow
      leaderboardSong={item}
      index={index}
      _handleSongRowPress={this._handleSongRowPress}
      addSongToDeleteList={this.props.addSongToDeleteList}
    />
  );

  getSavedSongs = () => (
    this.props.leaderboardSongs.length
      ? (
        <FlatList
          data={this.props.leaderboardSongs}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this._shuffleButton()}
          ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      )
      : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
  );

  render = () => (
    <View style={styles.container}>
      {this.getSavedSongs()}
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
  shufflePlay,
  addSongToDeleteList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedSongs);
