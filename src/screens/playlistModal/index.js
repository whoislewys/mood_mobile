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
import PropTypes from 'prop-types';
import Images from '../../assets/images';
import { dimensions, spacing } from '../../assets/styles';
import Playlists from '../playlists';
import {
  closeModal,
  loadPlaylists,
  setPlaylistModalHalfScreen,
  setPlaylistModalOpen,
  setPlaylistModalClosed,
  setPlaylistScrollingNotNegative,
  updateNewPlaylistName,
  addToNewPlaylistSongs,
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
    opacity: 0.5,
  },
  modalContents: {
    flex: 1,
    borderRadius: 10,
    elevation: 35,
    shadowRadius: 300,
    shadowOpacity: 1.0,
    backgroundColor: 'white',
  },
  swipeBar: {
    // for some reason giving it a background color here makes the swipe work
    backgroundColor: 'white',
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
  aboutHalfScreen = dimensions.height * 0.2451;

  constructor(props) {
    super(props);

    // set modal to fill half screen by default
    this.state = {
      yPosition: new Animated.Value(dimensions.height),
    };

    if (!this.props.playlists) {
      // if you've opened this playlist modal but never fetched playlists, get them now
      this.props.loadPlaylists();
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.componentWillFocus);
    this.props.navigation.addListener('willBlur', this.componentWillBlur);
    this.props.addToNewPlaylistSongs(this.props.songIdToAdd);
  }

  componentWillFocus = () => {
    this.props.setPlaylistModalOpen();
    this._animateModalToHalfScreen();
  };

  componentWillBlur = () => {
    this.props.setPlaylistModalClosed();
    this._animateModalOffScreen();
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.playlistScrollIsNegative) {
      // close this playlist modal if the playlist's scroll view is scrolling over the top song
      this.handleModalClose();
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

    const initialAnimateUp = {
      transform: [{ translateY: this.state.yPosition }],
    };

    return (
      <View style={styles.swipeContainer}>
        { Platform.OS === 'android'
          ? <View style={styles.androidBlackOverlay} />
          : null
        }
        <Animated.View
          style={[styles.swipeContainer, initialAnimateUp]}
        >
          <Animated.View style={[styles.modalContents, animationStyle]}>
            <GestureRecognizer
              style={styles.swipeBar}
              onSwipeUp={() => this._animateModalToFullscreen()}
              onSwipeDown={() => this.handleModalClose()}
            >
              <TouchableOpacity style={styles.exitButtonContainer} onPress={() => this.handleModalClose()}>
                <Image source={Images.close} style={styles.exitButton} />
              </TouchableOpacity>
            </GestureRecognizer>
            <Playlists navigation={this.props.navigation} handleModalClose={this.handleModalClose} />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  _animateModalToHalfScreen = () => {
    Animated.timing(this.state.yPosition, {
      toValue: this.aboutHalfScreen,
      duration: 320,
      useNativeDriver: true,
    }).start();
  };

  _animateModalOffScreen = () => {
    Animated.timing(this.state.yPosition, {
      toValue: dimensions.height,
      duration: 320,
      useNativeDriver: true,
    }).start();
  };

  _animateModalToFullscreen = () => {
    Animated.timing(this.state.yPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  handleModalClose = () => {
    this.props.setPlaylistScrollingNotNegative();
    this.props.setPlaylistModalHalfScreen();
    this.props.navigation.goBack();
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
  loadPlaylists,
  closeModal,
  updateNewPlaylistName,
  addToNewPlaylistSongs,
  setPlaylistModalHalfScreen,
  setPlaylistModalOpen,
  setPlaylistModalClosed,
  setPlaylistScrollingNotNegative,
};

PlaylistModal.propTypes = {
  songIdToAdd: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
