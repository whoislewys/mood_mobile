import { Dimensions, Platform } from 'react-native';

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const colors = {
  black: '#212121',
  red: '#FF3B30',
  orange: '#FF7F02',
  salmon: '#FF534B',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#007AFF',
  purple: '#5856D6',
  pink: '#FF377E',
  yellow: '#FFCC00',
  gold: 'goldenrod',
  gray: '#C9C9C9', // if this is how they spell it in 50 Shades, that's how I'll spell it dammit
  header: 'rgba(0, 0, 0, 0.87)',
  subHeader: 'rgba(0, 0, 0, 0.60)',
  body: 'rgba(0, 0, 0, 0.60)',
};

// TODO: customize this once wil sends padding
export const spacing = {
  sm: dimensions.height * 0.0246,
  md: dimensions.height * 0.0357, // corresponds to padding of 29 in the XD design
  lg: dimensions.height * 0.0530,
  xl: 40,
  headerHeight: Platform.OS === 'android' ? dimensions.height * 0.11 : dimensions.height * 0.12,
};

export const fonts = {
  primaryBold: 'Quicksand-Bold',
  primary: 'Quicksand-Medium',
  primaryLight: 'Quicksand-Regular',
  primaryThin: 'Quicksand-Light',
  header: 34,
  subHeader: 16.92,
  body: 14,
};
