import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PlaylistRow from './components/playlistRow';
import {
  closeModal,
  createPlaylist,
  loadPlaylists,
  loadSongsForPlaylistId,
  openModal,
  saveSongToPlaylist,
  setCurrentPlaylist,
  setPlaylistModalFullScreen,
  setPlaylistScrollingNegative,
  resetNewPlaylistSongs,
  updateNewPlaylistName,
} from '../../redux/modules/playlists';
import TwoButtonModal from '../../components/modals/two-button-modal';
import { dimensions, spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
  },
  playlistButtonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: spacing.md, // TODO: replace with global margin
    marginBottom: spacing.md,
  },
  playlistButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

/**
 * This component is rendered both as a full screen, and as a child of the PlaylistModal
 */
class Playlists extends Component {
  componentWillFocus = () => {
    this.props.loadPlaylists();
  }

  componentWillBlur = () => {
    this.props.setPlaylistModalHalfScreen();
  }

  _navigateToPlaylistsScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Playlists',
      params: { ...params, visible: true },
    });
  };

  _navigateToPlaylistDetailScreen = () => {
    this.props.navigation.navigate({
      routeName: 'PlaylistDetail',
      params: {
        parentScreen: 'Playlists',
        visible: false,
      },
    });
  };

  keyExtractor = (playlist) => {
    const key = playlist.id.toString();
    return key;
  }

  _showCurrentPlaylist = (pressedPlaylist) => {
    this.props.setCurrentPlaylist(pressedPlaylist);
    this.props.loadSongsForPlaylistId(pressedPlaylist.id);
    this._navigateToPlaylistDetailScreen();
  };

  // For the case where you add songs to playlists through this screen,
  // call the func that lets people add a song to the selected playlist.
  // For the other case, show the songs within that playlist
  _handlePlaylistRowPress =
    (pressedPlaylist) => {
      if (this.props.isPlaylistModalOpen) {
        // TODO: currently newPlaylistSongs set only has 1 value in it at a time. this may not always be true in the future
        this.props.saveSongToPlaylist(this.props.newPlaylistSongs.values().next().value , pressedPlaylist.id);
        this.props.resetNewPlaylistSongs();
        this.props.handleModalClose();
      } else {
        this._showCurrentPlaylist(pressedPlaylist);
      }
    };

  _onOpenCreatePlaylistModal = () => {
    if (!this.props.userIsLoggedIn) {
      this.props.navigation.navigate('Login');
      return;
    }
    if (!this.props.isCreatePlaylistModalOpen) this.props.openModal();
  };

  _renderItem = ({item, index}) => (
    <PlaylistRow
      playlist={item}
      index={index}
      _handlePlaylistRowPress={this._handlePlaylistRowPress}
      _onCreatePlaylist={this._onOpenCreatePlaylistModal}
    />
  );

  _playlistButton = () => (
    {
      id: 'create-playlist',
      name: 'Create Playlist',
    });

  handleScroll = (event) => {
    // get the yoffset where the user let their finger off the screen after scrolling
    const yOffset = event.nativeEvent.contentOffset.y;

    if (Math.sign(yOffset) === -1 || Math.sign(yOffset) === 0) {
      // user is trying to scroll up past the first piece of content in the list, update the state to reflect their scrolling is negative
      this.props.setPlaylistScrollingNegative();
    } else {
      // update the state to show the user is trying to scroll down through the list, playlistModal should be fullscreen
      this.props.setPlaylistModalFullScreen();
    }
  };

  getPlaylists = () => {
    const playlistsNoSavedSongs = this.props.playlists.filter(playlist => playlist.name !== 'Saved Songs');

    playlistsNoSavedSongs.forEach(function (playlist) {
      if (playlist.artworks[0] != null) {
        // todo: stitch together 4 artworks in songRow if (playlist.artworks.length > 4)
        playlist.artwork = playlist.artworks[0];
      }
    });

    return (
      !this.props.loading && this.props.playlists !== undefined
        ? (
          <FlatList
            data={[this._playlistButton()].concat(playlistsNoSavedSongs)}
            renderItem={this._renderItem}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={<View style={{ paddingBottom: spacing.md }} />}
            // HACK: add a big footer to the end of the flatlist so that it reliably sends scroll events for any amount of playlists > 1
            // in both the standalone screen and modal contexts
            ListFooterComponent={<View style={{ height: 0, paddingBottom: dimensions.height * 0.5 }} />}
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={this.handleScroll}
            scrollEventThrottle={16}
          />
        )
        : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
    );
  };

  _onCreatePlaylist = async () => {
    const songsForNewPlaylist = Array.from(this.props.newPlaylistSongs);
    await this.props.createPlaylist(songsForNewPlaylist);

    if (this.props.playlistError === '') {
      if (this.props.isPlaylistModalOpen) {
        this.props.handleModalClose();
      }
    }
    this.props.resetNewPlaylistSongs();
  };

  getModal = () => (
    <TwoButtonModal
      cancel={() => this.props.closeModal()}
      confirm={this._onCreatePlaylist}
      onChangeText={text => this.props.updateNewPlaylistName(text)}
      value={this.props.newPlaylistName}
      visible={this.props.isCreatePlaylistModalOpen}
    />
  );

  render = () => {
    // This screen can render in two contexts.
    // 1. As a modal that lets you add songs to a playlist
    // 2. As a standalone screen that you can play music through
    // A different function is called in each case when clicking a playlist row
    // See more in the _handlePlaylistRowPress func
    if (!this.props.loading) {
      return (
        <View style={styles.container}>
          {this.getModal()}
          {this.getPlaylists()}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  isPlaylistModalOpen: state.playlists.isPlaylistModalOpen,
  playlists: state.playlists.playlists,
  playlistError: state.playlists.error,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
  newPlaylistSongs: state.playlists.newPlaylistSongs,
});

const mapDispatchToProps = {
  closeModal,
  createPlaylist,
  loadPlaylists,
  loadSongsForPlaylistId,
  openModal,
  saveSongToPlaylist,
  setCurrentPlaylist,
  setPlaylistModalFullScreen,
  setPlaylistScrollingNegative,
  updateNewPlaylistName,
  resetNewPlaylistSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
