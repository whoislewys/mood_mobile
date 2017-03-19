import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';

import Images from '@assets/images';
import Moods from '@assets/moods';
import Songs from '@assets/mood_lists';
import _ from 'lodash';

let MoodListItem = React.createClass({
  render: function() {
    console.log(Moods[this.props.mood]);
    
    return (
      <TouchableHighlight onPress={() => { this.props.link(_.filter(Songs, {'mood': this.props.mood})) }}>
        <View style={styles.container}>
          <Text style={styles.text}>
            { Moods[this.props.mood] }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    alignItems: 'flex-start',
    fontFamily: 'Roboto',
    fontWeight: '400'
  }
});

export default MoodListItem;
