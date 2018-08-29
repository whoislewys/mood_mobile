import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  Image,
  Dimensions,
} from 'react-native';

import Images from '@assets/images';

const [width] = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  body: {
    flex: 95,
  },
  shadow: {
    flex: 1,
    height: 50,
    padding: 15,
    paddingTop: 55,
    paddingBottom: 25,
    zIndex: 3,
    marginBottom: 15,
    marginTop: 15,
  },
  headerText: {
    flex: 1,
    color: '#555',
    fontSize: 30,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    paddingBottom: 4,
    marginRight: 35,
  },

  section: {
    borderColor: '#bbb',
    padding: 20,
    paddingLeft: 10,
    marginLeft: 20,
  },
  sectionOne: {
    // flexDirection: 'row',
    paddingLeft: 0,
    paddingBottom: 0,
    alignItems: 'center',
  },
  headText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    fontFamily: 'Roboto',
    marginBottom: 8,
  },
  bodyText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto',
  },
  textRow: {
    fontWeight: '400',
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 10,
  },
  link: {
    color: '#0B0080',
    textDecorationLine: 'underline',
  },
  arrow: {
    resizeMode: 'stretch',
    width: 15,
    height: 19,
    marginLeft: 20,
    marginBottom: 2,
    tintColor: 'black',
    opacity: 0.7,
  },
  gradientHeading: {
    flex: 1,
    resizeMode: 'stretch',
    maxHeight: 1.5,
    maxWidth: width,
    marginLeft: 0,
  },
  bigButton: {
    resizeMode: 'contain',
    width: width * 0.54,
    height: 117,
  },
});

export default class SettingsScreen extends Component {
  render = () => {
    StatusBar.setBarStyle('dark-content', true);

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this.props.navigation.goBack} style={{ alignSelf: 'center', width: 25, marginRight: 10 }}>
              <Image source={Images.arrowLeftWhite} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </View>
        <Image source={Images.gradientHeading} style={styles.gradientHeading} />
        <View style={styles.body}>
          <View style={[styles.section, styles.sectionOne]}>
            <TouchableOpacity onPress={() => Linking.openURL('https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk')}>
              <Image source={Images.reviewButton} style={styles.bigButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('http://moodindustries.com/privacy.pdf')}>
              <Image source={Images.termsButton} style={styles.bigButton} />
            </TouchableOpacity>
          </View>
          <View style={[styles.section]}>
            <Text style={styles.textRow}>
              © 2017 Mood Industries LLC, all rights reserved.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}