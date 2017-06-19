import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import CheckBox from 'react-native-checkbox';

import Images from '@assets/images';

let Mood = React.createClass({
  _onCheckboxChange(state) {
    this.props.setMood(this.props.id);
  },
  render: function() {
    // let text = this.props.mood.name.split(" ");
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.mood.name}</Text>
        <View style={styles.checkbox}>
          <CheckBox
            label={""}
            checked={this.props.selected == this.props.id}
            onChange={this._onCheckboxChange}
            checkedImage={Images.selectedDot}
            uncheckedImage={Images.unselectedDot}
            checkboxStyle={styles.circle}
            containerStyle={{marginBottom: 0}}
            underlayColor={'transparent'}
          />
        </View>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
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
    color: 'lightgray',
    backgroundColor: 'transparent',
    fontSize: 20
  }
});

export default Mood;
