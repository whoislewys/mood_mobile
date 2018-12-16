import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Images from '@assets/images';
import { dimensions } from '../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: dimensions.width,
    height: dimensions.height,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: dimensions.width,
    height: dimensions.height,
    resizeMode: 'cover',
    opacity: 0.5,
  },
});

export default class Background extends Component {
  render = () => (
      <View style={styles.container}>
        <Image source={this.props.image} style={styles.bgImage} blurRadius={this.props.blur} />
        { this.getOverlay() }
      </View>
  )

  getOverlay = () => {
    if (this.props.overlay === undefined) {
      return (
        <View style={styles.container}>
          <Image source={Images.bgOverlay} style={styles.bgImage} />
          { this.props.children }
        </View>
      );
    }
    return (
        <View style={styles.container}>
          <Image source={this.props.overlay} style={styles.bgImage} />
          { this.props.children }
        </View>
    );
  }
}
