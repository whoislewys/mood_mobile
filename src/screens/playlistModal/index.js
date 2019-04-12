import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Images from '../../assets/images';
import { spacing } from '../../assets/styles';

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalContents: {
    height: '58.49%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  exitButtonContainer: {
    paddingVertical: spacing.sm,
  },
  exitButton: {
    height: 33,
    width: 33,
    resizeMode: 'contain',
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
          <TouchableOpacity style={styles.exitButtonContainer} >
            <Image source={Images.playlistButton} style={styles.exitButton} />
          </TouchableOpacity>
          <Text>ballzacc</Text>
        </View>
      </GestureRecognizer>
    );
  }
}
