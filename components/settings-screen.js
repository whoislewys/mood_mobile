import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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

    elevation: 2,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#bbb',
    shadowOffset: { height: 0, width: 0 },
  },
  headerText: {
    flex: 1,
    color: '#222',
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    paddingBottom: 4
  },

  section: {
    borderColor: '#bbb',
    padding: 20

  },
  sectionOne: {
    borderBottomWidth: 1
  },
  headText: {
    fontWeight: '400',
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto',
    marginBottom: 8
  },
  bodyText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto',
  }
});

export default React.createClass({
  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true);
  },
  _return() {
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
    this.props.navigation.goBack();
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this._return} style={{alignSelf: 'center', width: 25, marginRight: 10}}>
              <Icon
                name='arrow-left'
                color='black'
                style={{backgroundColor: 'transparent'}}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={[styles.section, styles.sectionOne]}>
            <Text style={styles.headText}>
              Rate & Review
            </Text>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              <Text style={styles.bodyText}>
                Please tap &nbsp;
              {/* </Text> */}
              <Text style={[styles.bodyText, {color: '#222', textDecorationLine: 'underline'}]}
                    onPress={() => Linking.openURL('http://google.com')}>
                this link
              </Text>
              {/* <Text style={styles.bodyText}> */}
                 &nbsp; to give us your thoughts. We always love your feedback!
              </Text>
            </View>
          </View>
          <View style={[styles.section, styles.sectionOne]}>
            <Text style={styles.headText}>
              Report a Bug
            </Text>
            <Text style={styles.bodyText}>
              If you encounter a bug on our website, please report it on our &nbsp;
              <Text style={[styles.bodyText, {color: '#222', textDecorationLine: 'underline'}]}
                    onPress={() => Linking.openURL('http://moodindustries.com/bug_reports/new')}>
                bug report page.
              </Text>
            </Text>
          </View>
          <View style={[styles.section, styles.sectionOne]}>
            <Text style={styles.headText}>
              Legal
            </Text>
            <Text style={styles.bodyText}>
              All intellectual property developed by Mood Industries LLC,
              including but not limited to any/all design and software development
              is protected by United States federal law and the proper legal structures.
            </Text>
          </View>
          <View style={styles.section}>

          </View>
        </View>
      </View>
    );
  },
});
