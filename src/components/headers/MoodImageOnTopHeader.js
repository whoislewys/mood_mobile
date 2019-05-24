import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { fonts, spacing, colors } from '../../assets/styles';

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: spacing.md,
    backgroundColor: '#fff',
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  headerText: {
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
  <View style={styles.headerStyle}>
    { topComponent }
    { titleIsCentered
      ? <Text style={[styles.headerText, styles.headerTextCenterAlign]}>{title}</Text>
      : <Text style={styles.headerText}>{title}</Text>
    }
  </View>
);

export default MoodImageOnTopHeader;
