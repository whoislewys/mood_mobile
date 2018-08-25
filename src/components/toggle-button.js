import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';


export default class ToggleButton extends Component {
  render = () => {
    let opacity = this.props.active ? 1 : 0.5;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image source={this.props.iconUnselected} style={[this.props.iconStyle, {opacity: opacity}]}/>
      </TouchableOpacity>
    );
  }
}
