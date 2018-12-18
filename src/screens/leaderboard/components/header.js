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
  },
});

const renderMoodLogo = (showLogo) => {
  return (showLogo ? <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10}/>
    : <View/>
  );
};

const Header = ({ headerText, showLogo }) => (
    <View style={styles.headerStyle}>
      {renderMoodLogo(showLogo)}
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.headerSubText}>Songs</Text>
    </View>
);

export default Header;
