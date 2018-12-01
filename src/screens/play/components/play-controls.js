import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Images from '@assets/images';
import ToggleButton from '../../../components/toggle-button';

const styles = StyleSheet.create({
  playControls: {
    flex: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 75,
    height: 75,
  },
  toggleShuffle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  toggleRepeat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  shuffleIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    opacity: 0.8,
  },
  repeatIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    opacity: 0.8,
    transform: [{ rotateY: '180deg' }],
  },
});

export default class PlayControls extends Component {
  render = () => (
      <View style={styles.playControls}>
        <View style={styles.toggleShuffle}>
          <TouchableOpacity onPress={this.props.skipBack}>
            <Image source={Images.skip1} style={styles.shuffleIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', flex: 2 }}>
          { this.playButton() }
        </View>
        <View style={styles.toggleRepeat}>
          <TouchableOpacity onPress={this.props.skipForward}>
            <Image source={Images.skip1} style={styles.repeatIcon} />
          </TouchableOpacity>
        </View>
      </View>
  )

  playButton = () => {
    let ret = (
      <TouchableOpacity onPress={this.props.handlePlayPress}>
        <Image source={Images.playButton} style={styles.playButton} />
      </TouchableOpacity>
    );

    if (this.props.loading) {
      ret = (
        <ActivityIndicator color={'white'} size={'large'} animating={true} style={styles.playButton}/>
      );
    } else if (this.props.playing) {
      ret = (
        <TouchableOpacity onPress={this.props.handlePlayPress}>
          <Image source={Images.pauseButton} style={styles.playButton} />
        </TouchableOpacity>
      );
    }

    return ret;
  }
}
