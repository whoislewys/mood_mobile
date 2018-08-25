import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '@assets/images.js';
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
    justifyContent: 'flex-end'
  },
  toggleRepeat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  shuffleIcon: {
    height: 31,
    width: 29,
    resizeMode: 'contain'
  },
  repeatIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain'
  }
});

export default class PlayControls extends Component {
  render = () => {
    return (
      <View style={styles.playControls}>
        <View style={styles.toggleShuffle}>
          <ToggleButton
            active={this.props.shuffle}
            iconUnselected={Images.shuffleButtonUnselected}
            onPress={this.props.toggleShuffle}
            iconStyle={styles.shuffleIcon}
          />
        </View>
        <View style={{alignItems: 'center', flex: 2}}>
          { this.playButton() }
        </View>
        <View style={styles.toggleRepeat}>
          <ToggleButton
            style={styles.toggleRepeat}
            active={this.props.repeat}
            iconUnselected={Images.repeatButtonUnselected}
            onPress={this.props.toggleRepeat}
            iconStyle={styles.repeatIcon}
          />
        </View>
      </View>
    );
  }

  playButton = () => {
    let ret = (
      <TouchableOpacity onPress={this.props.handlePlayPress}>
        <Image source={Images.playButton} style={styles.playButton} />
      </TouchableOpacity>
    );

    if(this.props.loading) {
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
