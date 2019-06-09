import React from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Images from '@assets/images';
import { fonts } from '../assets/styles';

const styles = StyleSheet.create({
  buttonImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  buttonImage: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.primaryBold,
    fontSize: fonts.body,
    color: '#fff',
    marginLeft: 3,
  },
});


// TODO: use default props to give default height width?
const GradientButton = props => (
  <TouchableOpacity
    style={[styles.buttonImageContainer, { height: props.height, width: props.width }]}
    onPress={props.onPress}
  >
    <ImageBackground source={Images.gradientButton} style={[styles.buttonImage, { height: props.height, width: props.width }]}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

// might beable to just set padding on text instead of specifying
GradientButton.defaultProps = {
  height: 32,
  width: 80,
};

export default GradientButton;
