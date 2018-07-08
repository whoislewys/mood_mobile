import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  NetInfo
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import Background from './background';
import Images from '@assets/images';

export default class Splash extends React.Component {
  state = {
    internetCheck: null
  };

  componentWillMount = () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidMount = () => {
    fetch('http://api.moodindustries.com/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    // fetch('http://localhost:3000/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });
        console.log(list);

        //Prefetch mood art
        var imagePrefetch = [];
        for (let mood of list) {
            imagePrefetch.push(Image.prefetch(mood.file));
        }

        Promise.all(imagePrefetch).then(results => {
            console.log("All images prefetched in parallel");
            this.props.setMoodList(list, this.navigateToMoodScreen);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleConnectivityChange = (isConnected) => {
    console.log(isConnected);
    if(!isConnected) {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this.handleConnectivityChange,
      );

      this.props.stopPlayback();
      this.navigateToErrorScreen();
    }
  }

  navigateToMoodScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Mood',
      params: { ...params }
    });
  };

  navigateToErrorScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Error',
      params: { ...params }
    });
  };

  render = () => {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
