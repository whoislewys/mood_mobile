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
import { fonts, colors, spacing } from '../../../assets/styles';

const styles = StyleSheet.create({
  rowBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    marginBottom: spacing.md,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1.2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
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
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.red,
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

const getStarsString = (stars) => {
  if (stars >= 1000 && stars < 10000) {
    // [one thousand, ten thousand)
    return `${(stars / 1000).toFixed(1)}k`;
  }
  if (stars >= 10000 && stars < 1000000) {
    // [ten thousand, one million)
    return `${(stars / 1000).toFixed(0)}k`;
  }
  if (stars >= 1000000 && stars < 10000000) {
    // [one million, ten million)
    return `${(stars / 1000000).toFixed(1)}m`;
  }
  if (stars >= 10000000 && stars < 1000000000) {
    // [ten million, one billion)
    return `${(stars / 1000000).toFixed(0)}m`;
  }
  if (stars >= 1000000000) {
    // [one billion, inf)
    return `${(stars / 1000000).toFixed(1)}b`;
  }
  return stars.toString();
};

const LeaderboardRow = ({
  leaderboardSong,
  index,
  _handleLeaderboardRowPress,
}) => {
  const {
    id,
    artist,
    artwork,
    title,
    stars,
  } = leaderboardSong;

  return (
    <TouchableOpacity
      accessible={false}
      testID={`LeaderboardRow-${title}`}
      style={styles.rowBackground}
      onPress={() => _handleLeaderboardRowPress(index, id)}
    >
      <Text style={styles.rank}>{index + 1}</Text>
      <Image style={styles.albumArt} source={{ uri: artwork }} />
      <View style={styles.detailsContainer}>
        <Text
          style={styles.songName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
          {/* {id} */}
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
        <Image source={Images.leaderboardStar} style={styles.starIcon} />
        <Text style={styles.starCount}>{getStarsString(stars)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LeaderboardRow;
