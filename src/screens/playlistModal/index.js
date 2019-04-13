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
  openModal, setPlaylistScrollingNotNegative,
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
    borderRadius: 10,
    elevation: 35,
    shadowRadius: 300,
    shadowOpacity: 1.0,
    backgroundColor: 'white',
  },
  exitButtonContainer: {
    paddingTop: spacing.sm,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
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

  shouldComponentUpdate(nextProps) {
    if (nextProps.playlistScrollIsNegative) {
      this.props.setPlaylistScrollingNotNegative();
      this.props.navigation.goBack();
    }
    return true;
  }

  render() {
    return (
      <View
        style={styles.swipeContainer}
      >
        { Platform.OS === 'android'
          ? <View style={styles.androidBlackOverlay} />
          : null
        }
        <View style={styles.modalContents}>
          <GestureRecognizer style={{backgroundColor: 'red'}} onSwipeDown={() => this.props.navigation.goBack()}>
            <TouchableOpacity style={styles.exitButtonContainer} onPress={() => this.props.navigation.goBack()}>
              <Image source={Images.close} style={styles.exitButton} />
            </TouchableOpacity>
          </GestureRecognizer>
          <Playlists />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  savedSongs: state.playlists.playlists,
  playlistError: state.playlists.error,
  playlistScrollIsNegative: state.playlists.playlistScrollIsNegative,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  loadLeaderboardSongQueue,
  loadPlaylists,
  openModal,
  closeModal,
  updateNewPlaylistName,
  setPlaylistScrollingNotNegative,
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
