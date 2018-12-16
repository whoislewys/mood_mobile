import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';


export default class ToggleButton extends Component {
  render = () => {
    const opacity = this.props.active ? 1 : 0.6;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={this.props.iconUnselected}
          style={[this.props.iconStyle, { opacity }]}
        />
      </TouchableOpacity>
    );
  }
}
