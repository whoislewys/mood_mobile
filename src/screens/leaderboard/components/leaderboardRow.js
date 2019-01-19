import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Images from '@assets/images';
import { fonts, colors } from '../../../assets/styles';

const styles = StyleSheet.create({
  rowBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 1.2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  rank: {
    fontFamily: 'Quicksand',
    width: 66.24,
    textAlign: 'center',
    fontSize: 34,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 2,
  },
  detailsContainer: {
    width: 120,
    marginLeft: 11,
    backgroundColor: '#FFFFFF',
    marginTop: -3,
  },
  songName: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
  },
  artistName: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.body,
    color: colors.body,
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  starCount: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
    marginLeft: 6,
  },
});

const LeaderboardRow = ({ leaderboardSong, index }) => {
  const {
    artist,
    name,
    stars,
    art_url,
  } = leaderboardSong;

  return (
    <View style={styles.rowBackground}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image style={styles.albumArt} source={{ uri: art_url }}/>
      <View style={styles.detailsContainer}>
        <Text
        style={styles.songName}
        numberOfLines={1}
        ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text style={styles.artistName}>{artist}</Text>
      </View>
      <View style={styles.starsContainer}>
        <Image source={Images.leaderboardStar}/>
        <Text style={styles.starCount}>{stars}</Text>
      </View>
    </View>
  );
};

export default LeaderboardRow;
