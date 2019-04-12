import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalContents: {
    height: '45%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class PlaylistModal extends Component {
  render() {
    return (
      <GestureRecognizer
        onSwipeDown={() => this.props.navigation.goBack()}
        style={styles.swipeContainer}
      >
        <View style={styles.modalContents}>
          <Text>Testing a modal with transparent background</Text>
        </View>
      </GestureRecognizer>
    );
  }
}
