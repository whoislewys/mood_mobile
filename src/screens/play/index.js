import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Images from '@assets/images';
import AlbumArt from './components/album-art';
import PlayOnOpen from './components/play-on-open';
import PlayControls from './components/play-controls';
import TrackInfo from './components/track-info';
import Background from '../../components/background';
import { dimensions } from '../../assets/styles';
import {
  handlePlayPress,
  skipToNext,
  skipToPrevious,
} from '../../redux/modules/queue';

const styles = StyleSheet.create({
  playContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: '5.9%',
    marginRight: '5.9%',
  },
  dropdownBar: {
    height: '11.52%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  backButton: {
    paddingTop: '1%',
    paddingLeft: '1.8%',
    resizeMode: 'contain',
    height: 40,
    width: 40,
  },
  trackInfoContainer: {
    width: '100%',
    height: '66%',
    marginTop: '4%',
    alignItems: 'center',
  },
  playControlsContainer: {
    marginTop: '8%',
  },
  trackInfoContainer1: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  albumContainer: {
    height: 0.902 * dimensions.width,
    width: 0.902 * dimensions.width,
    resizeMode: 'stretch',
  },
  infoText: {
    flex: 1,
  },
});


class PlayScreen extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
  }

  render = () => {
    if (!this.props.queue.length || (this.props.curTrack == null)) {
      return <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>;
    }

    return (
      // TODO: refactor to get rid of trackInfo
      // and add each of it's child components separately
      <Background
        image={{ uri: this.props.curTrack.artwork }}
        blur={25}
        height={dimensions.height}
        bottom={0}
      >
        <PlayOnOpen
          playing={this.props.playing}
          playByDefault={this.props.handlePlayPress}
          parentScreen={this.props.parentScreen}
        />
        <View style={styles.playContainer}>
          { this.getDropdownBar() }
          <View style={styles.trackInfoContainer}>
            { this.getAlbumArt() }
            { this.getTrackInfoAndPlaybar() }
          </View>
          <View style={styles.playControlsContainer}>
            { this.getPlayControls() }
          </View>
        </View>
      </Background>
    );
  }


  getDropdownBar = () => {
    return (
      <View style={styles.dropdownBar}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Mood')}
          style={styles.backButton}
        >
          <Image source={Images.arrowDown} />
        </TouchableOpacity>
      </View>
    );
  }

  getAlbumArt = () => {
    return (
      <View style={styles.albumContainer}>
        <AlbumArt
          url={this.props.curTrack.artwork}
          skipForward={this.props.skipToNext}
          skipBack={this.props.skipToPrevious}
        />
      </View>
    );
  }

  getTrackInfoAndPlaybar = () => {
    return (
      <TrackInfo
        setTime={this.props.setTime}
        track={this.props.curTrack}
      />
    );
  }

  getPlayControls = () => {
    return (
      <PlayControls
        shuffled={this.props.shuffled}
        repeat={this.props.repeat}
        skipForward={this.props.skipToNext}
        skipBack={this.props.skipToPrevious}
        playing={this.props.playing}
        handlePlayPress={this.props.handlePlayPress}
        loading={this.props.loading}
        currentTrack={this.props.curTrack}
      />
    );
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue.queue,
  curTrack: state.queue.curTrack,
});

const mapDispatchToProps = {
  handlePlayPress,
  skipToNext,
  skipToPrevious,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
