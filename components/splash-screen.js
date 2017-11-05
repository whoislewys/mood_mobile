import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import Background from './background';
import Images from '@assets/images';

var Splash = React.createClass({
  componentDidMount: function() {
    fetch('http://api.moodindustries.com/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    // fetch('http://localhost:3000/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });

        //Prefetch mood art
        var imagePrefetch = [];
        for (let mood of list) {
            imagePrefetch.push(Image.prefetch(mood.file));
        }
        Promise.all(imagePrefetch).then(results => {
            console.log("All images prefetched in parallel");
            this.props.navigation.navigate('Mood', {moods: list})
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={Images.splashScreen} style={styles.bgImage}>
        </Image>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

export default Splash;
