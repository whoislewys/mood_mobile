import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Images from '@assets/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
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
