import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Images from '@assets/images';
import { loadQueueStartingAtId, shufflePlay } from '../../redux/modules/queue';
import { addSongToDeleted, removeSongFromDeleted, resetToDeleteSet } from '../../redux/modules/playlists';
import { sendScoreDelta } from '../../redux/modules/score';
import SongRow from './components/songRow';
import { colors, fonts, spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
  },
  noSongsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSongsText: {
    textAlign: 'center',
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.gray,
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
});

export class SavedSongs extends Component {
  componentDidMount() {
    this.props.navigation.addListener('willBlur', this.componentWillBlur);
  }

  componentWillBlur = () => {
    // this.props.deleteSongs();
    this.props.resetToDeleteSet();
    // TODO: call playlists update() func with the savedsongplaylistid
  };

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

  _shuffleButton = () => (
    <View>
      <TouchableOpacity
        style={styles.shuffleButtonContainer}
        onPress={() => {
          this.props.shufflePlay(this.props.savedSongs);
          this.props.navigation.navigate('Play');
        }}
      >
        <Image source={Images.shuffle} style={styles.shuffleButton} />
      </TouchableOpacity>
    </View>
  );

  _handleSongRowPress = async (pressedSongIndex) => {
    this.props.loadQueueStartingAtId(pressedSongIndex, this.props.savedSongs);
    this._navigateToPlayScreen();
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
      songIdToAdd={() => item.id}
      songIdsToDelete={this.props.songIdsToDelete}
    />
  );

  getSavedSongs = () => {
    if (this.props.savedSongs.length) {
      return (
        <FlatList
          data={this.props.savedSongs}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this._shuffleButton()}
          ListFooterComponent={<View style={{ height: 0, marginBottom: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.props.loading) {
      return (
        <ActivityIndicator color='black' size='large' animating style={{ flex: 10 }} />
      );
    }

    return (
      <View style={styles.noSongsContainer}>
        <Text style={styles.noSongsText}>Rank some songs!</Text>
      </View>
    );
  };

  render = () => (
    <View style={styles.container}>
      {this.getSavedSongs()}
    </View>
  );
}

const mapStateToProps = state => ({
  loading: state.playlists.loading,
  savedSongs: state.playlists.savedSongs,
  songIdsToDelete: state.playlists.songIdsToDelete,
});

const mapDispatchToProps = {
  addSongToDeleted,
  loadQueueStartingAtId,
  removeSongFromDeleted,
  resetToDeleteSet,
  sendScoreDelta,
  shufflePlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedSongs);
