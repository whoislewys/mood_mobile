import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { fonts, spacing, colors } from '../../assets/styles';

const styles = StyleSheet.create({
  topComponentContainer: {
    paddingTop: spacing.sm,
    backgroundColor: '#fff',
  },
  textContainer: {
    backgroundColor: '#fff',
    height: spacing.headerHeight / 2.1,
  },
  headerText: {
    marginLeft: spacing.sm,
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
  },
  headerTextCenterAlign: {
    alignSelf: 'center',
  },
});

// might have to make this so that you have to make the image yourself before passing it in
const MoodImageOnTopHeader = ({
  title,
  titleIsCentered,
  topComponent,
}) => (
  <View>
    <View style={styles.topComponentContainer}>
      { topComponent }
    </View>
    <View style={styles.textContainer}>
      { titleIsCentered
        ? <Text style={[styles.headerText, styles.headerTextCenterAlign]}>{title}</Text>
        : <Text style={styles.headerText}>{title}</Text>
      }
    </View>
  </View>
);

export default MoodImageOnTopHeader;
