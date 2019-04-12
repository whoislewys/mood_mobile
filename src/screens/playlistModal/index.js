import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import { spacing } from '../../assets/styles';
import Playlists from '../playlists';
import { loadLeaderboardSongQueue } from '../../redux/modules/queue';
import {
  closeModal,
  createPlaylist, loadPlaylists,
  openModal,
  updateNewPlaylistName,
} from '../../redux/modules/playlists';

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  androidBlackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.4,
  },
  modalContents: {
    height: '58.49%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 35,
    shadowRadius: 300,
    shadowOpacity: 1.0,
  },
  exitButtonContainer: {
    paddingTop: spacing.sm,
  },
  exitButton: {
    height: 33,
    width: 33,
    resizeMode: 'contain',
  },
});

export class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    if (!this.props.playlists) {
      this.props.loadPlaylists();
    }
  }

  render() {
    return (
      <GestureRecognizer
        onSwipeDown={() => this.props.navigation.goBack()}
        style={styles.swipeContainer}
      >
        { Platform.OS === 'android'
          ? <View style={styles.androidBlackOverlay} />
          : null
        }
        <View style={styles.modalContents}>
          <TouchableOpacity style={styles.exitButtonContainer} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.close} style={styles.exitButton} />
          </TouchableOpacity>
          <Playlists />
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  savedSongs: state.playlists.playlists,
  playlistError: state.playlists.error,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  loadLeaderboardSongQueue,
  loadPlaylists,
  openModal,
  closeModal,
  updateNewPlaylistName,
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
