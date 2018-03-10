import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Images from '@assets/images.js';

export default class Background extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Image source={this.props.image} style={styles.bgImage} blurRadius={this.props.blur} />
        { this.getOverlay() }
      </View>
    );
  }

  getOverlay = () => {
    if(this.props.overlay == undefined) {
      return (
        <View style={styles.container}>
          <Image source={Images.bgOverlay} style={styles.bgImage} />
          { this.props.children }
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image source={this.props.overlay} style={styles.bgImage} />
          { this.props.children }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover'
  }
});
