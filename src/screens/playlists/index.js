import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PlaylistRow from './components/playlistRow';
import { loadLeaderboardSongQueue, setCurrentPlaylist } from '../../redux/modules/queue';
import {
  openModal,
  closeModal,
  updateNewPlaylistName,
  createPlaylist,
  setPlaylistScrollingNegative,
  setPlaylistModalFullScreen,
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

  _handlePlaylistRowPress = async (pressedPlaylist) => {
    // TODO: swap loadLeaderboardSongQueue for loadPlayListSongsForId
    // this.props.loadLeaderboardSongQueue(pressedLeaderboardSongIndex);
    this._navigateToPlaylistDetailScreen();
    this.props.setCurrentPlaylist(pressedPlaylist);
    // TODO: NEED TO reset playlist id to -1 when navigating away from playlist detail screen
  };

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
      title: 'Create Playlist',
      subtitle: 'Make a new bonerific playlist',
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

  getPlaylists = () => (
    !this.props.loading
      ? (
        <FlatList
          data={[this._playlistButton(), ...this.props.playlists]}
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

  _onCreatePlaylist = async () => {
    await this.props.createPlaylist();
    if (this.props.playlistError === '') {
      // TODO: load newly created playlist here by calling
      //  whatever I replace _handlePlaylistRowPress with
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
    <View style={styles.container}>
      {this.getModal()}
      {this.getPlaylists()}
    </View>
  )
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  playlists: state.playlists.playlists,
  playlistError: state.playlists.error,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  closeModal,
  createPlaylist,
  loadLeaderboardSongQueue,
  openModal,
  setCurrentPlaylist,
  setPlaylistModalFullScreen,
  setPlaylistScrollingNegative,
  updateNewPlaylistName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
