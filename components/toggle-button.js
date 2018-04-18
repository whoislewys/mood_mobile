import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';


export default class ToggleButton extends React.Component {
  render = () => {
    let opacity = this.props.active ? 1 : 0.5;

    return <TouchableOpacity onPress={this.props.onPress}>
      <Image source={this.props.iconUnselected} style={[this.props.iconStyle, {opacity: opacity}]}/>
    </TouchableOpacity>;
  }
}

let styles = StyleSheet.create({

});
