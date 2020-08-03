import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import Images from '@assets/images';
import { loadQueueStartingAtSong, shufflePlay } from '../../redux/modules/queue';
import {
  addSongToDeleted,
  deletePlaylist,
  deleteSongsFromPlaylist,
  removeSongFromDeleted,
  resetToDeleteSet,
} from '../../redux/modules/playlists';
// todo: DRY up this SongRow component
import SongRow from './components/songRow';
// import SongRow from '../savedSongs/components/songRow';
import {
  dimensions,
  fonts,
  colors,
  spacing,
} from '../../assets/styles';
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
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  shuffleButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  noSongsWarningContainer: {
    flex: 1,
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: dimensions.height * 0.33,
    color: colors.black,
  },
});

class PlaylistDetail extends Component {
  componentDidMount() {
    this.props.navigation.addListener('willBlur', this.componentWillBlur);
  }

  componentWillBlur = async () => {
    await this.props.deleteSongsFromPlaylist(this.props.curPlaylistId, this.props.songIdsToDelete);
    this.props.resetToDeleteSet();
  };

  _navigateToLeaderboardScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Leaderboard',
      params: { ...params, visible: true },
    });
  };

  _shuffleButton = () => (
    <View>
      <TouchableOpacity
        style={styles.shuffleButtonContainer}
        onPress={() => {
          this.props.shufflePlay(this.props.playlistSongs);
        }}
      >
        <Image source={Images.shuffle} style={styles.shuffleButton} />
      </TouchableOpacity>
    </View>
  );

  _handleSongRowPress = async (playlistSongIndex, playlistSongId) => {
    await this.props.loadQueueStartingAtSong(playlistSongIndex, playlistSongId, this.props.playlistSongs);
  };

  _handleSaveButtonPress = () => {
    this.props.deleteSongsFromPlaylists();
  };

  _renderHeader = () => (
    <MoodCenterHeader
      title={this.props.curPlaylistTitle}
      leftButtonIcon={Images.arrowLeft}
      onPressLeftButton={this.props.navigation.goBack}
      // todo: provision these when new playlist experience improves
      // rightButtonIcon={Images.savedIcon}
      // onPressRightButton={() => console.warn('saving')}
      rightButtonIcon={Images.deletePlaylist}
      onPressRightButton={() => this._deleteCurPlaylist()}
    />
  );

  _deleteCurPlaylist = () => {
    this.props.deletePlaylist(this.props.curPlaylistId);
    this.props.navigation.goBack();
  };

  keyExtractor = song => song.id.toString();

  _renderItem = ({ item, index }) => (
    <SongRow
      savedSong={item}
      index={index}
      _handleSongRowPress={this._handleSongRowPress}
      addSongToDeleted={this.props.addSongToDeleted}
      removeSongFromDeleted={this.props.removeSongFromDeleted}
      openPlaylistModal={() => (
        this.props.navigation.navigate({
          routeName: 'PlaylistModal',
          params: { songIdToAdd: parseInt(item.id, 10) },
        })
      )}
      songIdsToDelete={this.props.songIdsToDelete}
    />
  );

  getPlaylistSongs = () => {
    if (this.props.playlistSongs != null) {
      if (this.props.playlistSongs.length === 0) {
        return (
          <Text style={styles.noSongsWarningContainer}>
            No songs in this playlist!
          </Text>
        );
      }
      return (
        <FlatList
          data={this.props.playlistSongs}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this._shuffleButton()}
          ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    return (
      <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
    );
  };

  render = () => {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={styles.songsContainer}>
          {this.getPlaylistSongs()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  curPlaylistId: state.playlists.curPlaylistId,
  curPlaylistTitle: state.playlists.curPlaylistTitle,
  songIdsToDelete: state.playlists.songIdsToDelete,
  playlistSongs: state.playlists.songs,
});

const mapDispatchToProps = {
  addSongToDeleted,
  deletePlaylist,
  deleteSongsFromPlaylist,
  loadQueueStartingAtSong,
  removeSongFromDeleted,
  resetToDeleteSet,
  shufflePlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);
