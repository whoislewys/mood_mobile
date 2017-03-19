import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Images from '@assets/images.js';

var Background = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={this.props.image} style={styles.bgImage} blurRadius={50}>
          { this.getOverlay() }
        </Image>
      </View>
    );
  },
  getOverlay: function() {
    if(this.props.overlay == undefined) {
      return <Image source={Images.bgOverlay} style={styles.bgImage}>
        { this.props.children }
      </Image>
    } else {
      return <Image source={this.props.overlay} style={styles.bgImage}>
        { this.props.children }
      </Image>
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

export default Background;
