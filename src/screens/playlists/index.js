import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import LeaderboardRow from './components/leaderboardRow';
import { loadLeaderboardSongQueue } from '../../redux/modules/queue';
import {
  openModal,
  closeModal,
  updateNewPlaylistName,
  createPlaylist,
} from '../../redux/modules/playlists';
import TwoButtonModal from '../../components/modals/two-button-modal';

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 21,
    paddingRight: 21,
  },
});

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
        // dont remember why this moodscreen prop even exists
        moodscreen: this._navigateToPlaylistsScreen,
      },
    });
  };

  keyExtractor = song => song.id.toString();

  _handleLeaderboardRowPress = async (pressedLeaderboardSongIndex) => {
    // TODO: swap loadLeaderboardSongQueue for loadPlayListSongsForId
    this.props.loadLeaderboardSongQueue(pressedLeaderboardSongIndex);
    this._navigateToPlaylistDetailScreen();
  };

  _onOpenCreatePlaylistModal = () => {
    if (!this.props.userIsLoggedIn) {
      this.props.navigation.navigate('Login');
      return;
    }
    if (!this.props.isCreatePlaylistModalOpen) this.props.openModal();
  };

  _renderItem = ({ item, index }) => (
    <LeaderboardRow
      leaderboardSong={item}
      index={index}
      _handleLeaderboardRowPress={this._handleLeaderboardRowPress}
      _onCreatePlaylist={this._onOpenCreatePlaylistModal}
    />
  );

  _firstItem = () => {
    const firstItem = {
      ...this.props.leaderboardSongs[0],
      id: 'create-playlist',
    };
    return (
    // TODO: build the object that will represent the playlist here
    // something like
      /*
      {
        id: 'create-playlist',
        image: '<url>',
        title: 'Create Playlist!',
        subtitle: '',
      }
       */
      firstItem
    );
  };


  getLeaderBoard = () => (
    this.props.leaderboardSongs.length
      ? (
        <FlatList
          // TODO: figure out the sticky header components
          data={[this._firstItem(), ...this.props.leaderboardSongs]}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      )
      : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
  );

  _onCreatePlaylist = async () => {
    await this.props.createPlaylist();
    if (this.props.playlistError === '') {
      // TODO: load newly created playlist here by calling
      //  whatever I replace _handleLeaderboardRowPress with
      this.props.navigation.navigate('PlaylistDetail');
    }
  };

  getModal = () => (
    <TwoButtonModal
      cancel={() => this.props.closeModal()}
      confirm={this._onCreatePlaylist}
      onChange={text => this.props.updateNewPlaylistName(text)}
      value={this.props.newPlaylistName}
      visible={this.props.isCreatePlaylistModalOpen}
    />
  );

  render = () => (
    <View style={styles.leaderboardContainer}>
      {this.getModal()}
      {this.getLeaderBoard()}
    </View>
  )
}

const mapStateToProps = state => ({
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  leaderboardSongs: state.leaderboard.songs,
  playlistError: state.playlists.error,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  loadLeaderboardSongQueue,
  openModal,
  closeModal,
  updateNewPlaylistName,
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
