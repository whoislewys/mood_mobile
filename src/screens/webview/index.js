import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  WebView,
} from 'react-native';
import Images from '@assets/images';
import { colors, spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginLeft: spacing.sm,
    position: 'absolute',
    top: 40,
    justifyContent: 'center',
  },
  buttonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
});

export default class FullScreenWebView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={{ ...StyleSheet.absoluteFillObject }}
          source={{ uri: this.props.url }}
          useWebkit
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.arrowLeft} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
