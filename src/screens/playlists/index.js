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
  loadSongsForPlaylistId,
  openModal,
  saveSongToPlaylist,
  setCurrentPlaylist,
  setPlaylistModalFullScreen,
  setPlaylistScrollingNegative,
  updateNewPlaylistName,
} from '../../redux/modules/playlists';
import TwoButtonModal from '../../components/modals/two-button-modal';
import { spacing } from '../../assets/styles';

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

  keyExtractor = song => song.id.toString();

  _showCurrentPlaylist = async (pressedPlaylist) => {
    this.props.setCurrentPlaylist(pressedPlaylist);
    this.props.loadSongsForPlaylistId(pressedPlaylist.id);
    this._navigateToPlaylistDetailScreen();
  };

  _handlePlaylistRowPress = // For the case where you add songs to playlists through this screen,
                            // call the func that lets people add a song to the selected playlist.
                            // For the other case, show the songs within that playlist
                            pressedPlaylist => (this.props.isPlaylistModalOpen
                              ? this.props.saveSongToPlaylist(this.props.songIdToAdd, pressedPlaylist.id)
                              : this._showCurrentPlaylist(pressedPlaylist)
                            )
  ;


  _onOpenCreatePlaylistModal = () => {
    if (!this.props.userIsLoggedIn) {
      this.props.navigation.navigate('Login');
      return;
    }
    if (!this.props.isCreatePlaylistModalOpen) this.props.openModal();
  };

  _renderItem = ({ item, index }) => (
    <PlaylistRow
      playlist={item}
      index={index}
      _handlePlaylistRowPress={this._handlePlaylistRowPress}
      _onCreatePlaylist={this._onOpenCreatePlaylistModal}
    />
  );

  _playlistButton = () => (
    {
      // cant pass artwork through here, the way we called images was incompatible
      id: 'create-playlist',
      name: 'Create Playlist',
      description: 'Make a new bonerific playlist',
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

    return (
      !this.props.loading && this.props.playlists !== undefined
        ? (
          <FlatList
            data={[this._playlistButton()].concat(playlistsNoSavedSongs)}
            renderItem={this._renderItem}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={<View style={{ paddingBottom: spacing.md }} />}
            ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={this.handleScroll}
            scrollEventThrottle={16}
          />
        )
        : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
    );
  };


  _onCreatePlaylist = async () => {
    await this.props.createPlaylist();
    if (this.props.playlistError === '') {
      this._handlePlaylistRowPress();
      this.props.navigation.navigate('PlaylistDetail');
    }
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

  render = () => (
    // This screen can render in two contexts.
    // 1. As a modal that lets you add songs to a playlist
    // 2. As a standalone screen that you can play music through
    // A different function is called in each case when clicking a playlist row
    // See more in the _handlePlaylistRowPress func
    !this.props.loading
      ? (
        <View style={styles.container}>
          {this.getModal()}
          {this.getPlaylists()}
        </View>
      )
      : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
  )
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  isPlaylistModalOpen: state.playlists.isPlaylistModalOpen,
  playlists: state.playlists.playlists,
  playlistError: state.playlists.error,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  closeModal,
  createPlaylist,
  loadSongsForPlaylistId,
  openModal,
  saveSongToPlaylist,
  setCurrentPlaylist,
  setPlaylistModalFullScreen,
  setPlaylistScrollingNegative,
  updateNewPlaylistName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
