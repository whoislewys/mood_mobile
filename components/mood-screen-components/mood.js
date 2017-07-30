import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import CheckBox from 'react-native-checkbox';

import Images from '@assets/images';

let Mood = React.createClass({
  _handlePress() {
    this.props.setMood(this.props.id);
  },
  render: function() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._handlePress} disabled={this.props.selected != -1}>
        <View style={styles.art}>
           <Image source={this.props.bg} style={styles.moodArt}/>
        </View>
        <View style={styles.info}>
          <Text style={styles.moodName}>
            { this.props.mood.name.toUpperCase() }
          </Text>
          <Text style={styles.moodInfo}>
            This is some sample mood info...
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',

    // borderTopWidth: 1,
    // borderTopColor: '#eee',
    height: 90
  },
  moodArt: {
    resizeMode: 'cover',
    flex: 1,
    width: 65,
  },
  art: {
    flex: 24,
    justifyContent: 'flex-start'
  },
  moodName: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  moodInfo: {
    color: '#555',
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: '600'
  },
  info: {
    flex: 80,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 65,
    marginLeft: 10
  },
});

export default Mood;
