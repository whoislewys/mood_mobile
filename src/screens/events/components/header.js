import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Images from '@assets/images';
import { fonts, colors } from '../../../assets/styles';

const ADD_EVENT_URL = 'https://goo.gl/forms/PoVlPj9YbhVq8zTp1';

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    paddingBottom: '10%',
    paddingTop: '15%',
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
  addEventButton: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginTop: '5%',
    marginLeft: '53%',
  },
  moodLogo: {
  },
});

const renderMoodLogo = (showLogo) => {
  return (showLogo ? <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10}/>
    : <View/>
  );
};

const renderSubText = (subText) => {
  return (subText ? <Text style={styles.headerSubText}>{subText}</Text>
    : <View/>);
};

const Header = ({ showLogo, headerText, subText }) => (
    <View style={styles.headerStyle}>
      {renderMoodLogo(showLogo)}
      <Text style={styles.headerText}>{headerText}</Text>
      <TouchableOpacity style={styles.addEventButton} onPress={() => Linking.openURL(ADD_EVENT_URL)}>
        <Image source={Images.addEventButton}/>
      </TouchableOpacity>
      {renderSubText(subText)}
    </View>
);

export default Header;
