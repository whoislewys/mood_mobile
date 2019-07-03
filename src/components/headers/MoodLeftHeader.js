import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  colors,
  dimensions,
  fonts,
  spacing,
} from '../../assets/styles';

const styles = StyleSheet.create({
  header: {
    height: spacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  headerContentsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginLeft: spacing.sm,
  },
  headerText: {
    flex: 75,
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
  },
  buttonRow: {
    flex: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});

const MoodLeftHeader = ({ title, children }) => (
  <View style={styles.header} testID='MoodLeftHeader'>
    <View style={styles.headerContentsContainer} testID='MoodLeftHeaderContentsContainer'>
      <Text style={styles.headerText}>{title}</Text>
      {children}
    </View>
  </View>
);

export default MoodLeftHeader;
