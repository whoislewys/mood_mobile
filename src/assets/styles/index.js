import { Dimensions } from 'react-native';

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const colors = {
  red: '#FF3B30',
  orange: '#FF7F02',
  salmon: '#FF534B',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#007AFF',
  purple: '#5856D6',
  pink: '#FF377E',
  yellow: '#FFCC00',
  header: 'rgba(0, 0, 0, 0.87)',
  subHeader: 'rgba(0, 0, 0, 0.60)',
  body: 'rgba(0, 0, 0, 0.60)',
};

// TODO: customize this once wil sends padding
export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  bold: 'Quicksand-Bold',
  primary: 'Quicksand-Medium',
  primaryLight: 'Quicksand-Regular',
  primaryThin: 'Quicksand-Light',
  header: 34,
  subHeader: 16.92,
  body: 14,
};
