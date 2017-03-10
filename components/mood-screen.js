import React from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import MoodListItem from './mood-screen-components/mood-list-item';

import Images from '@assets/images';
import Moods from '@assets/moods';

let MoodScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={Images.moodLogo}></Image>
        </View>
        <View style={styles.body}>
          { this.moodList() }
        </View>
      </View>
    );
  },
  moodList: function() {
    let list = [];
    const length = Object.keys(Moods).length;

    for(var i = 0; i < length; i++) {
      list.push(
        <MoodListItem mood={i} key={i} link={this.props.play} />
      );
    }

    return list;
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#222'
  },
  body: {
    flex: 85,
    backgroundColor: '#4f4f4f'
  },
  logo: {
    height: 70,
    resizeMode: 'contain',
    marginBottom: 15
  }
});

export default MoodScreen;
