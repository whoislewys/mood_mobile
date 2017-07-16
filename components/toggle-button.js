import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

let ToggleButton = React.createClass({
  render: function() {
    let child = this.props.active ? (
      // <Image source={this.props.iconSelected} style={styles.icon} />
      this.props.iconSelected
    ) : (
      this.props.iconUnselected
      // <Image source={this.props.iconUnselected} style={styles.icon} />
    );

    return <TouchableOpacity onPress={this.props.onPress}>
      { child }
    </TouchableOpacity>;
  }
});

let styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  }
});

export default ToggleButton;
