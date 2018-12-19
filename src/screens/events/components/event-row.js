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
    borderWidth: 0.5,
    borderColor: 'white', // !!! borderColor passed as prop later !!!
    elevation: 1,
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 1.2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  dateContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
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
    fontSize: fonts.header,
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
  } = event;

  return (
    <View style={[styles.rowBackground, { borderWidth: 0.5, borderColor }]}>
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
    </View>
  );
};

export default EventRow;
