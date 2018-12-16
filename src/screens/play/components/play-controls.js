import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ToggleButton from '../../../components/toggle-button';
import ClapButton from '../../../components/medium-star';
import Images from '@assets/images';

const styles = StyleSheet.create({
  playControls: {
    height: 71,
    width: 311,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    width: 71,
    height: 71,
    marginRight: -25.5,
    marginLeft: -25.5,
  },
  skipLeftIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    opacity: 0.6,
  },
  skipRightIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    opacity: 0.6,
    transform: [{ rotateY: '180deg' }],
  },
  share: {
    height: 20,
    width: 20,
    tintColor: 'white',
    opacity: 1.0,
    resizeMode: 'contain',
  },
});

export default class PlayControls extends Component {
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

  render = () => (
      <View style={styles.playControls}>
        <ClapButton />
        <TouchableOpacity onPress={this.props.skipBack}>
          <Image source={Images.skip} style={styles.skipLeftIcon} />
        </TouchableOpacity>
        { this.playButton() }
        <TouchableOpacity onPress={this.props.skipForward}>
          <Image source={Images.skip} style={styles.skipRightIcon} />
        </TouchableOpacity>
        <ToggleButton iconUnselected={Images.shareOutline} style={styles.share}/>
      </View>
  )
}
