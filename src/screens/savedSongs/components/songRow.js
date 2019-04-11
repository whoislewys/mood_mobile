import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Images from '@assets/images';
import { fonts, colors, spacing } from '../../../assets/styles';

const styles = StyleSheet.create({
  rowBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginBottom: spacing.md,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 2,
  },
  detailsContainer: {
    flex: 30,
    marginLeft: 11,
    marginTop: '1%',
    alignSelf: 'flex-start',
  },
  songName: {
    fontFamily: fonts.primary,
    fontSize: 15,
    color: colors.subHeader,
  },
  artistName: {
    fontFamily: fonts.primaryLight,
    fontSize: 13,
    color: colors.body,
  },
  buttonsContainer: {
    flex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  savedIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: spacing.sm,
  },
  playlistButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

class SongRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songIsSaved: true,
    };
  }

  _handleDeleteSong = () => {
    this.setState({ songIsSaved: false },
      () => this.props.addSongToDeleteList(this.props.leaderboardSong));
  };

  _getSavedSongButton = () => (this.state.songIsSaved
    ? (
      <TouchableOpacity onPress={() => this._handleDeleteSong()}>
        <Image source={Images.savedIcon} style={styles.savedIcon} />
      </TouchableOpacity>
    )
    : (
      <TouchableOpacity>
        <Image source={Images.savedIcon} style={styles.savedIcon} />
      </TouchableOpacity>
    )
  );

  render() {
    const {
      index,
      leaderboardSong: { artist, artwork, title },
      _handleSongRowPress,
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.rowBackground}
        onPress={() => _handleSongRowPress(index)}
      >
        <Image style={styles.albumArt} source={{ uri: artwork }} />
        <View style={styles.detailsContainer}>
          <Text
            style={styles.songName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            style={styles.artistName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {artist}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          { this._getSavedSongButton() }
          <TouchableOpacity>
            <Image source={Images.playlistButton} style={styles.playlistButton} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SongRow;
