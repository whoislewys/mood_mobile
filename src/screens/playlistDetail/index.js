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
import { loadQueueStartingAtId, shufflePlay } from '../../redux/modules/queue';
import { addSongToDeleted, removeSongFromDeleted } from '../../redux/modules/playlists';
import { sendScoreDelta } from '../../redux/modules/score';
import SongRow from './components/songRow';
import { spacing } from '../../assets/styles';
import MoodCenterHeader from '../../components/headers/MoodCenterHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  songsContainer: {
    flex: 1,
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

class PlaylistDetail extends Component {
  componentDidMount() {
    this.props.navigation.addListener('willBlur', this.componentWillBlur);
  }

  componentWillBlur = () => {
    // TODO: call update() with the changed songs
  };

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

  _shuffleButton = () => (
    <View>
      <TouchableOpacity
        style={styles.shuffleButtonContainer}
        onPress={() => {
          this.props.shufflePlay(this.props.queue);
          this.props.navigation.navigate('Play');
        }}
      >
        <Image source={Images.shuffle} style={styles.shuffleButton} />
      </TouchableOpacity>
    </View>
  );

  _handleSongRowPress = async (pressedLeaderboardSongIndex) => {
    this.props.loadQueueStartingAtId(pressedLeaderboardSongIndex, this.props.playlistSongs);
    this._navigateToPlayScreen();
  };

  _renderHeader = () => (
    <MoodCenterHeader
      title={this.props.curPlaylistTitle}
      leftButtonIcon={Images.cancelPlaylist}
      onPressLeftButton={this.props.navigation.goBack}
      rightButtonIcon={Images.savedIcon}
      onPressRightButton={() => console.warn('saving')}
    />
  );

  keyExtractor = song => song.id.toString();

  _renderItem = ({ item, index }) => (
    <SongRow
      leaderboardSong={item}
      index={index}
      _handleSongRowPress={this._handleSongRowPress}
      addSongToDeleted={this.props.addSongToDeleted}
      removeSongFromDeleted={this.props.removeSongFromDeleted}
    />
  );

  getPlaylistSongs = () => (
    this.props.playlistSongs !== undefined
      ? (
        <FlatList
          data={this.props.playlistSongs}
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
      {this._renderHeader()}
      <View style={styles.songsContainer}>
        {this.getPlaylistSongs()}
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  playlistSongs: state.playlists.songs,
  curPlaylistId: state.queue.curPlaylistId,
  curPlaylistTitle: state.queue.curPlaylistTitle,
});

const mapDispatchToProps = {
  addSongToDeleted,
  loadQueueStartingAtId,
  removeSongFromDeleted,
  sendScoreDelta,
  shufflePlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);
