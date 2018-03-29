import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '@assets/images.js';
import ToggleButton from '../toggle-button';

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
    height: 35,
    width: 35,
    resizeMode: 'contain'
  },
  repeatIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain'
  }
});

export default class PlayControls extends React.Component {
  render = () => {
    return (
      <View style={styles.playControls}>
        {/* <ToggleButton
          active={this.props.add}
          iconSelected={Images.addSongSelected}
          iconUnselected={Images.addSongUnselected}
          onPress={this.props.toggleAdd}
        /> */}

        <View style={styles.toggleShuffle}>
          <ToggleButton
            active={this.props.shuffle}
            iconSelected={Images.shuffleButtonSelected}
            iconUnselected={Images.shuffleButtonUnselected}
            onPress={this.props.toggleShuffle}
            iconStyle={styles.shuffleIcon}
          />
        </View>
        {/* <ToggleButton
          active={this.props.liked == -1}
          iconSelected={
            <Icon
              name='thumb-down'
              color='white'
              style={{backgroundColor: 'transparent'}}
              size={25}
            />
          }
          iconUnselected={
            <Icon
              name='thumb-down-outline'
              color='white'
              style={{backgroundColor: 'transparent'}}
              size={25}
            />
          }
          onPress={this.props.toggleDislike}
        /> */}
        <View style={{alignItems: 'center', flex: 2}}>
          { this.playButton() }
        </View>

        {/* <ToggleButton
          active={this.props.liked == 1}
          iconSelected={
            <Icon
              name='thumb-up'
              color='white'
              style={{backgroundColor: 'transparent'}}
              size={25}
            />
          }
          iconUnselected={
            <Icon
              name='thumb-up-outline'
              color='white'
              style={{backgroundColor: 'transparent'}}
              size={25}
            />
          }
          onPress={this.props.toggleLike}
        /> */}

        <View style={styles.toggleRepeat}>
          <ToggleButton
            style={styles.toggleRepeat}
            active={this.props.repeat}
            iconSelected={Images.repeatButtonSelected}
            iconUnselected={Images.repeatButtonUnselected}
            onPress={this.props.toggleRepeat}
            iconStyle={styles.repeatIcon}
          />
        </View>

        {/* <ToggleButton
          active={this.props.more}
          iconSelected={Images.moreButtonSelected}
          iconUnselected={Images.moreButtonUnselected}
          onPress={this.props.toggleMore}
        /> */}
      </View>
    );
  }

  playButton = () => {
    if (this.props.playing) {
      return (<TouchableOpacity onPress={this.props.handlePlayPress}>
        <Image source={Images.pauseButton} style={styles.playButton} />
      </TouchableOpacity>);
    }
    return (<TouchableOpacity onPress={this.props.handlePlayPress}>
      <Image source={Images.playButton} style={styles.playButton} />
    </TouchableOpacity>);
  }
}
