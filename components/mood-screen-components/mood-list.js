import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import MoodListItem from './mood-list-item';
import Moods from '@assets/moods';

import Images from '@assets/images';

let MoodList = React.createClass({
  render: function() {
    return (
      <View style={styles.list}>
        <Text style={[styles.text, { marginTop: 40, marginBottom: 10 } ]}>
          how do you feel?
        </Text>
        <Image source={Images.horizontalRule}></Image>
        { this.moodList() }
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
  list: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 18
  }
});

export default MoodList;
