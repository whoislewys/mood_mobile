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
    paddingTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 18,
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
    marginRight: 20,
  },
  headerSubText: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
    marginTop: 5,
  },
  addEventButton: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
    marginLeft: 45,
    marginTop: '7%',
    // my version
    // resizeMode: 'stretch',
    // marginTop: '5%',
    // marginLeft: '53%',
  },
  addIcon: {
    height: 55,
    width: 55,
  },
  moodLogo: {
  },
});

const renderMoodLogo = showLogo => (
  showLogo ? <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10}/>
    : <View/>
);

const renderSubText = (subText) => {
  return (subText ? <Text style={styles.headerSubText}>{subText}</Text>
    : <View/>);
};

const Header = ({ showLogo, headerText, subText }) => (
    <View style={styles.headerStyle}>
      {renderMoodLogo(showLogo)}
      <Text style={styles.headerText}>{headerText}</Text>
      <TouchableOpacity style={styles.addEventButton} onPress={() => Linking.openURL(ADD_EVENT_URL)}>
        <Image source={Images.addEventButton} style={styles.addIcon}/>
      </TouchableOpacity>
      {renderSubText(subText)}
    </View>
);

export default Header;
