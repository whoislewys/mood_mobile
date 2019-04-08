import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Images from '@assets/images';
import { fonts, colors } from '../../../assets/styles';

const styles = StyleSheet.create({
  arrow: {
    width: 15.22,
    height: 25,
    tintColor: '#D1D1D6',
    opacity: 0.7,
    alignSelf: 'flex-start',
    marginLeft: '20%',
  },
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '12%',
    paddingTop: '10%',
  },
  headerText: {
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: '8.5%',
  },
});

const Header = ({ headerText, goBack }) => (
  <View style={styles.headerStyle}>
    <TouchableOpacity onPress={goBack}>
      <Image source={Images.arrowLeft} style={styles.arrow} />
    </TouchableOpacity>
    <Text style={styles.headerText}>{headerText}</Text>
  </View>
);

export default Header;
