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
  headerStyle: {
    marginTop: '10%',
    paddingBottom: '8%',
    backgroundColor: '#fff',
    marginLeft: 5,
  },
  headerText: {
    marginTop: '2%',
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
  },
  headerSubText: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
    marginTop: 5,
  },
  moodLogo: {
    alignSelf: 'center',
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
});

const LeaderboardHeader = ({ title }) => (
  <View style={styles.headerStyle}>
    <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10} />
    <Text style={styles.headerText}>{title}</Text>
    <Text style={styles.headerSubText}>Songs</Text>
  </View>
);

export default LeaderboardHeader;
