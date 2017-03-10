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
    return (
      <TouchableHighlight onPress={() => { this.props.link(_.filter(Songs, {'mood': this.props.mood})) }}>
        <View style={styles.container}>
          <Text style={styles.text}>
            { Moods[this.props.mood] }
          </Text>
          <Image style={styles.arrow} source={Images.dropdownArrowRight} />
        </View>
      </TouchableHighlight>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
    alignItems: 'flex-start',
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  arrow: {
    flex: 1,
    width: 20,
    height: 20,
    justifyContent: 'flex-end',
    resizeMode: 'contain'
  }
});

export default MoodListItem;
