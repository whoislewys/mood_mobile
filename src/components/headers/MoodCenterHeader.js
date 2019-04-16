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
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerContentsContainer: {
    flexDirection: 'row',
    marginRight: spacing.sm,
    marginLeft: spacing.sm,
  },
  button: {
    flex: 12.5,
    justifyContent: 'center',
  },
  buttonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    // TODO this tintcolor only used for settings screen, maybe make it a prop?
    tintColor: '#D1D1D6',
  },
  headerText: {
    alignSelf: 'center',
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
  },
});

const renderButton = (buttonIcon, onPressButton) => (
  <TouchableOpacity style={styles.button} onPress={() => onPressButton()} activeOpacity={0.6}>
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
      { renderButton(leftButtonIcon, onPressLeftButton) }
      <Text style={styles.headerText}>{title}</Text>
      { renderButton(rightButtonIcon, onPressRightButton) }
    </View>
  </View>
);

export default MoodCenterHeader;
