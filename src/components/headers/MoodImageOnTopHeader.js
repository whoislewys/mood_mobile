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
  headerSubText: {
    marginTop: 5,
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: colors.subHeader,
  },
});

// might have to make this so that you have to make the image yourself before passing it in
const LeaderboardHeader = ({
  title,
  subtitle,
  titleIsCentered,
  topComponent,
}) => (
  <View style={styles.headerStyle}>
    { topComponent }
    { titleIsCentered
      ? <Text style={[styles.headerText, styles.headerTextCenterAlign]}>{title}</Text>
      : <Text style={styles.headerText}>{title}</Text>
    }
    {subtitle != null
      ? <Text style={styles.headerSubText}>{subtitle}</Text>
      : null
    }
  </View>
);

export default LeaderboardHeader;
