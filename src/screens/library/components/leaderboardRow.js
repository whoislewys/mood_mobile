import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Images from '@assets/images';
import { fonts, colors } from '../../../assets/styles';

const styles = StyleSheet.create({
  rowBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    width: '100%',
    marginBottom: 15,
  },
  albumArt: {
    width: 54,
    height: 54,
    borderRadius: 2,
  },
  detailsContainer: {
    flex: 20,
    marginLeft: 11,
    marginTop: 15,
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
    marginRight: '10%',
  },
  playlistIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});


const LeaderboardRow = ({
  leaderboardSong,
  index,
  _handleLeaderboardRowPress,
}) => {
  const {
    artist,
    artwork,
    title,
    stars,
  } = leaderboardSong;

  return (
    <TouchableOpacity
      style={styles.rowBackground}
      onPress={() => _handleLeaderboardRowPress(index)}
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
        <TouchableOpacity>
          <Image source={Images.leaderboardStar} style={styles.savedIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.leaderboardStar} style={styles.playlistIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default LeaderboardRow;
