import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';

let ToggleButton = React.createClass({
  render: function() {
    let child = this.props.active ? (
      <Image source={this.props.iconSelected} style={styles.icon} />
    ) : (
      <Image source={this.props.iconUnselected} style={styles.icon} />
    );

    return <TouchableHighlight onPress={this.props.onPress} underlayColor={'transparent'}>
      { child }
    </TouchableHighlight>;
  }
});

let styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  }
});

export default ToggleButton;
