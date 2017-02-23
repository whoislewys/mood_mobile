import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Images from '@assets/images';
import ToggleButton from '../toggle-button';

let PlayControls = React.createClass({
  render: function() {
    return (
      <View style={styles.playControls}>
        <ToggleButton
          active={this.props.add}
          iconSelected={Images.addSongSelected}
          iconUnselected={Images.addSongUnselected}
          onPress={this.props.toggleAdd}
        />

        <ToggleButton
          active={this.props.shuffle}
          iconSelected={Images.shuffleButtonSelected}
          iconUnselected={Images.shuffleButtonUnselected}
          onPress={this.props.toggleShuffle}
        />

        { this.playButton() }

        <ToggleButton
          active={this.props.repeat}
          iconSelected={Images.repeatButtonSelected}
          iconUnselected={Images.repeatButtonUnselected}
          onPress={this.props.toggleRepeat}
        />

        <ToggleButton
          active={this.props.more}
          iconSelected={Images.moreButtonSelected}
          iconUnselected={Images.moreButtonUnselected}
          onPress={this.props.toggleMore}
        />
      </View>
    );
  },
  playButton: function() {
    if(this.props.playing) {
      return <TouchableHighlight onPress={this.props.handlePlayPress} underlayColor={'transparent'}>
        <Image source={Images.pauseButton} style={styles.playButton} />
      </TouchableHighlight>
    } else {
      return <TouchableHighlight onPress={this.props.handlePlayPress} underlayColor={'transparent'}>
        <Image source={Images.playButton} style={styles.playButton} />
      </TouchableHighlight>
    }
  }
});

let styles = StyleSheet.create({
  playControls: {
    flex: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  playButton: {
    width: 75,
    height: 75
  },
});

export default PlayControls;
