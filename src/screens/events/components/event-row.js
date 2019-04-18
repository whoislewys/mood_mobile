import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import { fonts, colors, spacing } from '../../../assets/styles';

const CAL_SHARE_LINK = 'https://calendar.google.com/calendar?cid=Z2hkNHYwamZic3I1aGpvZTNpc2ZqdHQ2MnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ';

const styles = StyleSheet.create({
  rowBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    marginBottom: spacing.md,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'white', // !!! borderColor passed as prop later !!!
    elevation: 1,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  dateContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  month: {
    fontFamily: fonts.primary,
    fontSize: fonts.body,
    color: colors.body,
  },
  day: {
    fontFamily: fonts.primary,
    width: 66.24,
    textAlign: 'center',
    fontSize: 25,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 2,
  },
  detailsContainer: {
    width: '70%',
    marginLeft: 11,
    backgroundColor: '#FFFFFF',
    marginTop: -3,
  },
  name: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.header,
  },
  location: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.body,
    color: colors.subHeader,
  },
});

const EventRow = ({ event }) => {
  const {
    summary,
    month,
    borderColor,
    day,
    timeAndPlace,
    htmlLink,
  } = event;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.rowBackground, { borderColor }]}
      onPress={() => Linking.openURL(htmlLink)}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      {/* <Image style={styles.albumArt} source={{ uri: art_url }}/> */}
      <View style={styles.detailsContainer}>
        <Text
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {summary}
        </Text>
        <Text
          style={styles.location}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {timeAndPlace}
        </Text>
      </View>
      {/*   <View style={styles.starsContainer}>
    //     <Image source={Images.leaderboardStar}/>
    //     <Text style={styles.starCount}>{stars}</Text>
    //   </View> */}
    </TouchableOpacity>
  );
};

export default EventRow;
