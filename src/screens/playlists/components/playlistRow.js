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
  index,
  playlist,
  _handleLeaderboardRowPress,
  _onCreatePlaylist,
}) => {
  const {
    artwork,
    subtitle,
    title,
  } = playlist;

  let _onPress;
  if (index === 0) {
    _onPress = _onCreatePlaylist;
  } else {
    _onPress = _handleLeaderboardRowPress;
  }

  const _getImage = (idx, art) => (
    index === 0 ? <Image style={styles.albumArt} source={Images.createPlaylist} />
      : <Image style={styles.albumArt} source={{ uri: art }} />
  );

  return (
    <TouchableOpacity
      style={styles.rowBackground}
      onPress={() => _onPress(index - 1)}
    >
      { _getImage(index, artwork) }
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
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistRow;
