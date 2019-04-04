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
    backgroundColor: '#fff',
  },
  rank: {
    flex: 8,
    fontFamily: 'Quicksand',
    textAlign: 'center',
    fontSize: 34,
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
  starsContainer: {
    flex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 15,
  },
  savedIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  playlistIcon: {
    width: 24,
    height: 24,
    marginLeft: '14%',
    resizeMode: 'contain',
  },
  starCount: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
    marginLeft: 6,
    // for some reason, textAlignVertical wasn't working on android
    marginBottom: Platform.OS === 'android' ? '4%' : '0%',
    textAlignVertical: 'center',
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
      <View style={styles.starsContainer}>
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
