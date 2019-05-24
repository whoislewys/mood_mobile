import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { WebView } from 'react-native';
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
    // TODO this tintcolor only used for settings screen, maybe make it a prop?
    tintColor: colors.black,
  },
});

export default class EventsForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={{ ...StyleSheet.absoluteFillObject }}
          source={{ uri: 'https://goo.gl/forms/PoVlPj9YbhVq8zTp1' }}
          useWebkit
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.arrowLeft} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
