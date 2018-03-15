import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import Images from '@assets/images.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
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

    // elevation: 2,
    // shadowOpacity: 0.75,
    // shadowRadius: 5,
    // shadowColor: '#bbb',
    // shadowOffset: { height: 0, width: 0 },
    marginBottom: 5,
    marginTop: 15,
  },
  headerText: {
    flex: 1,
    color: '#555',
    fontSize: 23,
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
    marginLeft: 20
  },
  sectionOne: {
    borderBottomWidth: 1
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
    marginBottom: 10
  },
  link: {
    color: '#0B0080',
    textDecorationLine: 'underline'
  },
  arrow: {
    resizeMode: 'stretch',
    width: 12,
    height: 18,
    marginLeft: 5,
    marginBottom: 2,
    tintColor: 'black',
    opacity: 0.9
  },
  gradientHeading: {
    flex: 1,
    resizeMode: 'stretch',
    maxHeight: 1.5,
    overflow: 'hidden'
  }
});

export default class SettingsScreen extends React.Component {
  componentWillMount = () => {
    StatusBar.setBarStyle('dark-content', true);
  }

  _return = () => {
    // fetch('http://api.moodindustries.com/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    // // fetch('http://localhost:3000/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    //   .then((responseJson) => {
    //     return responseJson.json();
    //   })
    //   .then((json) => {
    //     let list = Object.keys(json).map(function (key) { return json[key]; });
    //     this.props.navigation.navigate('Mood', {moods: list})
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this._return} style={{alignSelf: 'center', width: 25, marginRight: 10}}>
              <Image source={Images.navArrowLeft} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </View>
        <Image source={Images.gradientHeading} style={styles.gradientHeading} />
        <View style={styles.body}>
          <View style={[styles.section, styles.sectionOne]}>
            <Text style={styles.headText}>
              Rate & Review
            </Text>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              <Text style={styles.bodyText}>
                Please tap &nbsp;
              {/* </Text> */}
              <Text style={[styles.bodyText, styles.link]}
                    onPress={() => Linking.openURL('https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk')}>
                this link
              </Text>
              {/* <Text style={styles.bodyText}> */}
                 &nbsp; to give us your thoughts. We always love your feedback!
              </Text>
            </View>
          </View>
          {/* <View style={[styles.section, styles.sectionOne]}>
            <Text style={styles.headText}>
              Report a Bug
            </Text>
            <Text style={styles.bodyText}>
              If you encounter a bug, please report it on our &nbsp;
              <Text style={[styles.bodyText, styles.link]}
                    onPress={() => Linking.openURL('http://moodindustries.com/bug_reports/new')}>
                bug report page.
              </Text>
            </Text>
          </View> */}
          <View style={[styles.section]}>
            <Text style={styles.headText}>
              Legal
            </Text>
              <Text style={styles.textRow}>
                © 2017 Mood Industries LLC, all rights reserved.
              </Text>

              <Text style={styles.textRow}>
                All intellectual property developed by Mood Industries LLC,
                including but not limited to any/all design and software development
                is protected by United States federal law and the proper legal structures.
              </Text>

              <Text style={styles.textRow}>
                All media used and distributed by Mood Industries LLC on the Mood.
                app was provided by artists and parties with their consent alongside permission
                to use their submitted media for commercial purposes.
              </Text>

              <Text style={[styles.textRow, styles.link]}
                    onPress={() => Linking.openURL('http://moodindustries.com/privacy.pdf')}>
                Privacy Policy
              </Text>
          </View>
          <View style={styles.section}>

          </View>
        </View>
      </View>
    );
  }
}
