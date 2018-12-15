import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Images from '@assets/images';
import { fonts, colors } from '../../../assets/styles';

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 41,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  headerText: {
    marginTop: 18,
    fontFamily: fonts.primary,
    fontSize: fonts.headline,
    color: colors.headline,
  },
  headerSubText: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
    marginTop: 5,
  },
  moodLogo: {
    alignSelf: 'center',
  },
});

const Header = ({ headerText }) => {
  return (
    <View style={styles.headerStyle}>
      <Image source={Images.moodLogo} style={styles.moodLogo}/>
      <Text style={styles.headerText}>Leaderboard</Text>
      <Text style={styles.headerSubText}>Songs</Text>
    </View>
  );
};

export default Header;
