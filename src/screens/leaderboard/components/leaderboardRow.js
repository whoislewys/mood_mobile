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
    marginRight: 5,
    marginLeft: 5,
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
    width: 56.24,
    textAlign: 'center',
    fontSize: 34,
  },
  albumArt: {
    width: 54,
    height: 54,
    borderRadius: 2,
  },
  detailsContainer: {
    width: 120,
    marginLeft: 11,
    backgroundColor: '#FFFFFF',
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
    flexDirection: 'row',
    marginLeft: 15,
  },
  starCount: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
    marginLeft: 6,
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

// Better number abbreviator
// function abbreviateNumber(value) {
//     var newValue = value;
//     if (value >= 1000) {
//         var suffixes = ["", "k", "m", "b","t"];
//         var suffixNum = Math.floor( (""+value).length/3 );
//         var shortValue = '';
//         for (var precision = 2; precision >= 1; precision--) {
//             shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
//             var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
//             if (dotLessShortValue.length <= 2) { break; }
//         }
//         if (shortValue % 1 != 0)  shortNum = shortValue.toFixed(1);
//         newValue = shortValue+suffixes[suffixNum];
//     }
//     return newValue;
// }

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
        ellipsizeMode="tail">
          {name}
        </Text>
        <Text
        style={styles.artistName}
        numberOfLines={1}
        ellipsizeMode="tail">
            {artist}
        </Text>
      </View>
      <View style={styles.starsContainer}>
        <Image source={Images.leaderboardStar}/>
        <Text style={styles.starCount}>{getStarsString(stars)}</Text>
      </View>
    </View>
  );
};

export default LeaderboardRow;
