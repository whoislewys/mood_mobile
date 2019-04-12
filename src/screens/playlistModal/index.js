import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    elevation: 8,
    shadowOpacity: 0.80,
    shadowRadius: 10,
  },
});

export default class PlaylistModal extends Component {
  render() {
    return (
      <GestureRecognizer
        onSwipeDown={() => this.props.navigation.goBack()}
      >
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <View style={{
            height: '45%', width: '100%', backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center',
          }}
          >
            <Text>Testing a modal with transparent background</Text>
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}
