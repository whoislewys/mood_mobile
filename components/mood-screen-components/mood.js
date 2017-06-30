import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-checkbox';

import Images from '@assets/images';

let Mood = React.createClass({
  _onCheckboxChange(state) {
    this.props.setMood(this.props.id);
  },
  render: function() {
    // let text = this.props.mood.name.split(" ");
    let ret = (
      <TouchableOpacity style={styles.container} onPress={this._onCheckboxChange}>
        <Text style={styles.text}>{this.props.mood.name}</Text>
      </TouchableOpacity>
    );

    if(this.props.selected == this.props.id) {
      ret = (
        <View style={styles.container} onPress={this._onCheckboxChange}>
          <Text style={styles.selected}>{this.props.mood.name}</Text>
        </View>
      );
    }

    return ret;
  }
});

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingLeft: 35,
    paddingRight: 30
  },
  checkbox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  circle: {
    width: 20,
    height: 20,
  },
  text: {
    flex: 10,
    textAlign: 'center',
    color: 'lightgray',
    backgroundColor: 'transparent',
    fontSize: 20
  },
  selected: {
    flex: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 26
  }
});

export default Mood;
