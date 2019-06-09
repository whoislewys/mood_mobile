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
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  );

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
