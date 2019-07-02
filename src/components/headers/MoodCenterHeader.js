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
    marginRight: spacing.sm,
    marginLeft: spacing.sm,
  },
  headerText: {
    flex: 75,
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 12.5,
    justifyContent: 'center',
  },
  buttonRightAlign: {
    alignItems: 'flex-end',
  },
  buttonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    // TODO this tintcolor only used for settings screen, maybe make it a prop?
    tintColor: colors.black,
  },
});

const renderLeftButton = (buttonIcon, onPressButton) => (
  <TouchableOpacity
    testID='MoodCenterHeaderLeftButton'
    style={styles.buttonContainer}
    onPress={() => onPressButton()}
    activeOpacity={0.6}
  >
    <Image source={buttonIcon} style={styles.buttonIcon} />
  </TouchableOpacity>
);

const renderRightButton = (buttonIcon, onPressButton) => (
  <TouchableOpacity
    testID='MoodCenterHeaderRightButton'
    style={[styles.buttonContainer, styles.buttonRightAlign]}
    onPress={() => onPressButton()}
    activeOpacity={0.6}
  >
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
  <View style={styles.header} testID='MoodCenterHeader'>
    <View style={styles.headerContentsContainer} testID='MoodCenterHeaderContentsContainer'>
      { renderLeftButton(leftButtonIcon, onPressLeftButton) }
      <Text style={styles.headerText} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
      { renderRightButton(rightButtonIcon, onPressRightButton) }
    </View>
  </View>
);

export default MoodCenterHeader;
