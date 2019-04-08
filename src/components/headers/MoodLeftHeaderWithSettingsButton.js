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
    <View style={styles.buttonRow}>
      <TouchableOpacity onPress={() => Linking.openURL('http://moodindustries.com/bug_reports/new')}>
        <Image source={Images.bugIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
        <Image source={Images.settingsGear} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </MoodLeftHeader>


);

export default MoodLeftHeaderWithSettingsButton;
