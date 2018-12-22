import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import ClapButton from '../../../components/medium-star';
import Images from '@assets/images';

const SHARE_URL = 'moodmusic.app.link';

const styles = StyleSheet.create({
  playControls: {
    height: 71,
    width: 311,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
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
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export default class PlayControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareIcon: Images.shareOutline,
    };
  }

  handleShare = () => {
    this.setState({ shareIcon: Images.share });
    Share.share({
      message: `Check out this bop on Mood! ${SHARE_URL}`,
      url: 'www.moodindustries.com',
    }).then((shareResult) => {
      // shareResult can be dismissedAction() or sharedAction() on ios
      // shareResult can ONLY be sharedAction() on android
      this.setState({ shareIcon: Images.shareOutline });
    });
  }

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
        {/*<ToggleButton iconUnselected={Images.shareOutline} style={styles.share}/>*/}
        <TouchableOpacity
        style={styles.share}
        activeOpacity={0.6}
        onPress={this.props.handleShare}>
          <Image source={this.state.shareIcon}/>
        </TouchableOpacity>
      </View>
  )
}
