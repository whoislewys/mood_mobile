import React from 'react';
import {
  View,
  Text,
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
    height: dimensions.height * 0.15,
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

const MoodLeftHeader = props => (
  <View style={styles.header}>
    <View style={styles.headerContentsContainer}>
      <Text style={styles.headerText}>{props.title}</Text>
      {props.children}
    </View>
  </View>
);

export default MoodLeftHeader;
