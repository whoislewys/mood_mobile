import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import { dimensions, spacing } from '../../assets/styles';
import Playlists from '../playlists';
import { loadLeaderboardSongQueue } from '../../redux/modules/queue';
import {
  closeModal,
  createPlaylist,
  loadPlaylists,
  setPlaylistModalHalfScreen,
  openModal,
  setPlaylistScrollingNotNegative,
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
    height: '100%',
    width: '100%',
    borderRadius: 10,
    elevation: 35,
    shadowRadius: 300,
    shadowOpacity: 1.0,
    backgroundColor: 'white',
  },
  swipeBar: {
    // for some reason giving it a background color here makes the swipe work
    backgroundColor: 'white',
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  exitButtonContainer: {
    marginTop: Platform.OS === 'ios' ? 7 : 0,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
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

    // set modal to fill half screen by default
    this.state = {
      yPosition: new Animated.Value(dimensions.height * 0.4151),
    };

    if (!this.props.playlists) {
      // if you've opened this playlist modal but never fetched playlists, get them now
      this.props.loadPlaylists();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.playlistScrollIsNegative) {
      // close this playlist modal if the playlist's scroll view is scrolling over the top song
      this._handleModalClose();
    }

    if (nextProps.isPlaylistModalFullScreen) {
      // if the store says this modal should be full screen, animate it up to be full screen
      this._animateModalToFullscreen();
    }
    return true;
  }

  render() {
    const animationStyle = {
      transform: [{ translateY: this.state.yPosition }],
    };
    return (
      <View
        style={styles.swipeContainer}
      >
        { Platform.OS === 'android'
          ? <View style={styles.androidBlackOverlay} />
          : null
        }
        {/* TODO: make the modalcontents view an animated.view, that animates it's top offset to 0 when this.props.isPlaylistModalFullScreen is true */}
        <Animated.View style={[styles.modalContents, animationStyle]}>
          <GestureRecognizer
            style={styles.swipeBar}
            onSwipeUp={() => this._animateModalToFullscreen()}
            onSwipeDown={() => this._handleModalClose()}
          >
            <TouchableOpacity style={styles.exitButtonContainer} onPress={() => this._handleModalClose()}>
              <Image source={Images.close} style={styles.exitButton} />
            </TouchableOpacity>
          </GestureRecognizer>
          <Playlists />
        </Animated.View>
      </View>
    );
  }

  _handleModalClose = () => {
    this.props.setPlaylistScrollingNotNegative();
    this.props.setPlaylistModalHalfScreen();
    this.props.navigation.goBack();
  };

  _animateModalToFullscreen = () => {
    Animated.timing(this.state.yPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  savedSongs: state.playlists.playlists,
  playlistError: state.playlists.error,
  playlistScrollIsNegative: state.playlists.playlistScrollIsNegative,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
  userIsLoggedIn: state.auth.userIsLoggedIn,
  isPlaylistModalFullScreen: state.playlists.isPlaylistModalFullScreen,
});

const mapDispatchToProps = {
  loadLeaderboardSongQueue,
  loadPlaylists,
  openModal,
  closeModal,
  updateNewPlaylistName,
  setPlaylistModalHalfScreen,
  setPlaylistScrollingNotNegative,
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
