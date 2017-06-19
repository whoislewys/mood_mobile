import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  transform
} from 'react-native';

import Images from '@assets/images';

let Mood = React.createClass({
  transform: function() {

    // console.log(this.props.mood.name + ": " + this.props.yOffset._value);

    return {
      transform: [{
        scale: this.props.yOffset.interpolate({
          inputRange: [
            0, 3.5, 7
          ],
          outputRange: [0.5, 1, 0.5],
        })
      }]
    };
  },
  render: function() {
    let text = this.props.mood.name.split(" ");
    return (
      <Animated.View style={[styles.container, this.transform()]}>
        <Image source={Images.moodCircle} style={styles.circle}>
          <Text style={styles.text}>
            {text[0]}
          </Text>
          <Text style={styles.text}>
            {text[1]}
          </Text>
          <Text style={styles.text}>
            {text[2]}
          </Text>
        </Image>
      </Animated.View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    width: 200,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 15
  }
});

export default Mood;
