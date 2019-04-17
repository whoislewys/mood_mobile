import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  colors,
  fonts,
  spacing,
} from '../../assets/styles';

const styles = StyleSheet.create({
  header: {
    height: spacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  button: {
    flex: 12.5,
    justifyContent: 'center',
  },
  buttonRightAlign: {
  },
  buttonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    // TODO this tintcolor only used for settings screen, maybe make it a prop?
    tintColor: '#D1D1D6',
  },
});

const renderLeftButton = (buttonIcon, onPressButton) => (
  <TouchableOpacity style={styles.button} onPress={() => onPressButton()} activeOpacity={0.6}>
    <Image source={buttonIcon} style={styles.buttonIcon} />
  </TouchableOpacity>
);

const renderRightButton = (buttonIcon, onPressButton) => (
  <TouchableOpacity style={[styles.button, styles.buttonRightAlign]} onPress={() => onPressButton()} activeOpacity={0.6}>
    <Image source={buttonIcon} style={styles.buttonIcon} />
  </TouchableOpacity>
);

const MoodCenterHeader = ({
  title,
  onPressLeftButton,
  leftButtonIcon,
  onPressRightButton,
  rightButtonIcon,
}) => (
  <View style={styles.header}>
    <View style={styles.headerContentsContainer}>
      { renderLeftButton(leftButtonIcon, onPressLeftButton) }
      <Text style={styles.headerText}>{title}</Text>
      { renderRightButton(rightButtonIcon, onPressRightButton) }
    </View>
  </View>
);

export default MoodCenterHeader;
