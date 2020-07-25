import React from 'react';
import {
  Image, Linking, TouchableOpacity, View,
} from 'react-native';
import Images from '@assets/images';
import MoodLeftHeader from './MoodLeftHeader';

const styles = {
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
};

const MoodLeftHeaderWithSettingsButton = props => (
  <MoodLeftHeader
    {...props}
  >
    <View style={styles.buttonRow} testID='MoodLeftHeaderWithSettingsButtonRow'>
      <TouchableOpacity
        accessible={false}
        testID='HeaderBugReportButton'
        onPress={() => {
          props.navigation.navigate({
            routeName: 'FullScreenWebView',
            params: {
              url: 'https://www.moodindustries.com/bug_reports/new',
            },
          });
        }}
      >
        <Image source={Images.bugIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} accessible={false} testID='HeaderSettingsButton'>
        <Image source={Images.settingsGear} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </MoodLeftHeader>
);

export default MoodLeftHeaderWithSettingsButton;
