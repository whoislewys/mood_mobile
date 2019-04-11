import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Images from '@assets/images';
import branch from 'react-native-branch';
import StarButton from '../../../components/medium-star';
import { anal } from '../../../redux/constants';
import { colors } from '../../../assets/styles';

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
  },
  skipRightIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    transform: [{ rotateY: '180deg' }],
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});

export default class PlayControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareIcon: Images.shareOutline,
    };
  }

  createBUO = async () => {
    // first param is $canonical_identifier. allows you to keep track of each link.
    // It must be a unique ID. branch will dedupe these on the back end!
    const {
      album,
      artist,
      artwork,
      id,
      mood_id,
      title,
      url,
    } = this.props.currentTrack;
    const branchUniversalObject = await branch.createBranchUniversalObject(
      id, {
        locallyIndex: true,
        // corresponds to $og_title, $og_description, and $og_image_url params respectively
        // used to display content as a preview card in facebook, twitter, iMessage etc...
        // structure for track object:
        title,
        contentDescription: 'Check out this track on Mood!',
        contentImageUrl: artwork,
        contentMetadata: {
          ratingAverage: 4.2,
          customMetadata: {
            // only strings allowed in customMetadata
            album: album === null ? '' : album,
            artist,
            mood_id: mood_id.toString(),
            url,
          },
        },
      },
    );
    return branchUniversalObject;
  };

  _handleShare = async () => {
    this.setState({ shareIcon: Images.share });
    const buo = await this.createBUO();

    this.props.logEvent(anal.songShare, this.props.currentTrack);

    // TODO: randomize message body to make sharing a little more novel
    const shareOptions = { messageHeader: 'I got some new music for you!', messageBody: 'Check out this bop on Mood!\n ' };
    const linkProperties = { feature: 'share', channel: 'RNApp' };
    const controlParams = {
      $desktop_url: 'http://www.moodindustries.com',
      $ios_url: 'https://moodmusic.app.link/ZIFgV4QdLS',
    };
    const { channel, completed, error } = await buo.showShareSheet(shareOptions, linkProperties, controlParams);
    if (!error) {
      this.setState({ shareIcon: Images.shareOutline });
    }
  };

  playButton = () => {
    let ret = (
      <TouchableOpacity onPress={this.props.handlePlayPress} testId='play-button'>
        <Image source={Images.playButton} style={styles.playButton} />
      </TouchableOpacity>
    );

    if (this.props.loading) {
      ret = (
        <ActivityIndicator color="white" size="large" animating style={styles.playButton} />
      );
    } else if (this.props.playing) {
      ret = (
        <TouchableOpacity onPress={this.props.handlePlayPress} testId='play-button'>
          <Image source={Images.pauseButton} style={styles.playButton} />
        </TouchableOpacity>
      );
    }

    return ret;
  };

  render = () => (
    <View style={styles.playControls}>
      <StarButton
        extraStyles={{ tintColor: '#fff' }}
        textColor={{ color: colors.gold }}
        shootFrom={{ x: 0, y: 0 }}
        spray={23}
        navigation={this.props.navigation}
      />
      <TouchableOpacity onPress={this.props.skipBack}>
        <Image source={Images.skip} style={styles.skipLeftIcon} />
      </TouchableOpacity>
      { this.playButton() }
      <TouchableOpacity onPress={this.props.skipForward}>
        <Image source={Images.skip} style={styles.skipRightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shareButton}
        activeOpacity={0.3}
        onPress={this._handleShare}
      >
        <Image source={this.state.shareIcon} style={styles.shareIcon} />
      </TouchableOpacity>
    </View>
  )
}
