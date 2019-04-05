import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import LeaderboardRow from './components/leaderboardRow';
import { loadLeaderboardSongQueue } from '../../redux/modules/queue';
import { openModal, closeModal, updateNewPlaylistName } from '../../redux/modules/playlists';
import { colors, fonts } from '../../assets/styles';

const styles = {
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 21,
    paddingRight: 21,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '72.0%',
    height: '17.24%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 10,
    shadowOpacity: 0.65,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  modalHeader: {
    height: '30%',
    justifyContent: 'flex-end',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 4,
    width: '85.93%',
    height: '23.57%',
    marginVertical: '4%',
  },
  modalButtonsRow: {
    height: '30%',
    flexDirection: 'row',
  },
  modalButtonLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRightWidth: 0.25,
    borderTopWidth: 0.5,
  },
  modalButtonRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderLeftWidth: 0.25,
    borderTopWidth: 0.5,
  },
  modalText: {
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
  },
  modalTextCancel: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.subHeader,
  },
};

class Playlists extends Component {
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

  keyExtractor = song => song.id.toString();

  _handleLeaderboardRowPress = async (pressedLeaderboardSongIndex) => {
    this.props.loadLeaderboardSongQueue(pressedLeaderboardSongIndex);
    this._navigateToPlayScreen();
  };

  _onCreatePlaylist = () => {
    if (!this.props.isCreatePlaylistModalOpen) this.props.openModal();
  };

  _renderItem = ({ item, index }) => (
    <LeaderboardRow
      leaderboardSong={item}
      index={index}
      _handleLeaderboardRowPress={this._handleLeaderboardRowPress}
      _onCreatePlaylist={this._onCreatePlaylist}
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
          ListHeaderComponent={<View style={{ height: 0, marginTop: 70 }} />}
          ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      )
      : <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
  );

  getModal = () => (
    <Modal visible={this.props.isCreatePlaylistModalOpen} style={{ margin: 0 }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalText}>Create new playlist</Text>
          </View>
          <TextInput
            style={styles.modalInput}
            onChangeText={text => this.props.updateNewPlaylistName(text)}
            value={this.props.newPlaylistName}
            placeholder='Enter playlist title'
          />
          <View style={styles.modalButtonsRow}>
            <TouchableOpacity onPress={() => this.props.closeModal()} style={styles.modalButtonLeft}>
              <Text style={[styles.modalText, styles.modalTextCancel]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity /* TODO: call this.props.createPlaylist() when endpoint is ready*/ style={styles.modalButtonRight}>
              <Text style={styles.modalText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  render = () => (
    <View style={styles.leaderboardContainer}>
      {this.getModal()}
      {this.getLeaderBoard()}
    </View>
  )
}

const mapStateToProps = state => ({
  leaderboardSongs: state.leaderboard.songs,
  isCreatePlaylistModalOpen: state.playlists.isCreatePlaylistModalOpen,
  updateNewPlaylistName: state.playlists.updateNewPlaylistName,
});

const mapDispatchToProps = {
  loadLeaderboardSongQueue,
  openModal,
  closeModal,
  updateNewPlaylistName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
