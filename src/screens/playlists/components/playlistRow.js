import React from 'react';
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
    width: '100%',
    marginBottom: spacing.md,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 2,
  },
  detailsContainer: {
    flex: 1,
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
});

const PlaylistRow = ({
  leaderboardSong,
  index,
  _handleLeaderboardRowPress,
  _onCreatePlaylist,
}) => {
  const {
    artist,
    artwork,
    title,
  } = leaderboardSong;

  let _onPress;
  if (index === 0) {
    _onPress = _onCreatePlaylist;
  } else {
    _onPress = _handleLeaderboardRowPress;
  }


  return (
    <TouchableOpacity
      style={styles.rowBackground}
      onPress={() => _onPress(index - 1)}
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
    </TouchableOpacity>
  );
};

export default PlaylistRow;
