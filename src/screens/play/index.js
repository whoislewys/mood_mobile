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
import Carousel from 'react-native-snap-carousel';
import AlbumArtCarouselItem from './components/album-art-carousel-item';
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
    zIndex: 2,
    paddingLeft: '1.8%',
    resizeMode: 'contain',
    height: 30,
    width: 30,
    opacity: 0.5,
  },
  trackInfoContainer: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
  },
  playControlsContainer: {
    paddingTop: '40%',
  },
});


class PlayScreen extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
    this.state = { slideIndex: 0 };
  }

  render = () => {
    if (!this.props.queue.length || (this.props.curTrack == null)) {
      return <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>;
    }

    return (
      // TODO: refactor so trackInfo and Playbar are separate components
      <Background
        image={{ uri: this.props.curTrack.artwork }}
        blur={25}
        height={dimensions.height}
        bottom={0}
      >
        { this.playOnOpen() }
        <View style={styles.playContainer}>
          { this.getDropdownBar() }
          <View style={styles.trackInfoContainer}>
            { /* this.getAlbumArt() */ }
            { this.getAlbumArtCarousel() }
            { this.getTrackInfoAndPlaybar() }
          </View>
          { this.getPlayControls() }
        </View>
      </Background>
    );
  }

  _nextTrack = () => {
    // TODO: implement a snap for when track ends
    // info on how to do 'ontrackend' stuff in github issues on react-native-track-player
    // args: snapToNext(animated, fireCallback)
    this._carouselref.snapToNext(true, false);
    this.props.nextTrack();
  }

  _previousTrack = () => {
    this.props.previousTrack();
    // args: snapToNext(animated, fireCallback)
    this._carouselref.snapToPrev(true, false);
  }

  playOnOpen = () => {
    // nasty hack to autoplay songs when playscreen first opens
    // should really refactor this out
    return (
      <PlayOnOpen
        playing={this.props.playing}
        playByDefault={this.props.handlePlayPress}
        parentScreen={this.props.parentScreen}
        startScoreTimer={this.props.startScoreTimer}
        currentTrack={this.props.curTrack}
        sendScoreDeltaFunc={this.props.sendScoreDelta}
      />);
  }

  getDropdownBar = () => {
    return (
      <View style={styles.dropdownBar}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Mood')} style={styles.backButton}>
          <Image source={Images.arrowDown} />
        </TouchableOpacity>
      </View>
    );
  }

  _renderCarouselItem = ({ item }) => {
    console.log('carousel art: ', item.artwork);
    let art = item.artwork !== undefined && item.artwork !== null ? item.artwork : 'https://i1.sndcdn.com/artworks-000232798771-b7p886-t500x500.jpg';
    console.log('carousel art: ', art);
    return <AlbumArtCarouselItem artwork={art}/>;
  }

  _handleCarouselSnap = (slideIndex) => {
    console.log('this slide index: ', this._carouselref.currentIndex);
    console.log('slide index: ', slideIndex);
    if (slideIndex > this._carouselref.currentIndex) {
      this.props.nextTrack();
    } else if (slideIndex < this._carouselref.currentIndex) {
      this.props.previousTrack();
    }
  }

  getAlbumArtCarousel = () => {
    // TODO: use the onSnapToItem() callback to move backwards and forwards through tracks
    // TODO: docs here: https://github.com/archriss/react-native-snap-carousel/blob/master/doc/PROPS_METHODS_AND_GETTERS.md#callbacks
    this._slideIndex = 0;
    return (
      <Carousel
        ref={(c) => { this._carouselref = c; }}
        data={this.props.queue}
        sliderWidth={dimensions.width}
        itemWidth={dimensions.width}
        renderItem={this._renderCarouselItem}
        // onSnapToItem={this._handleCarouselSnap}
        onBeforeSnapToItem={this._handleCarouselSnap}
        lockScrollWhileSnapping={true}
      />
    );
  }

  getTrackInfoAndPlaybar = () => (
      <TrackInfo
        skipForward={this._nextTrack}
        skipBack={this._previousTrack}
        track={this.props.curTrack}
        setTime={this.props.setTime}
      />
  );

  getPlayControls = () => (
    <View style={styles.playControlsContainer}>
      <PlayControls
        shuffled={this.props.shuffled}
        repeat={this.props.repeat}
        toggleShuffle={this.props.toggleShuffle}
        toggleRepeat={this.props.toggleRepeat}
        skipForward={this._nextTrack}
        skipBack={this._previousTrack}
        playing={this.props.playing}
        handlePlayPress={this.props.handlePlayPress}
        loading={this.props.loading}
        currentTrack={this.props.curTrack}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue.queue,
  curTrack: state.queue.curTrack,
  albumArtList: state.queue.albumArtList,
});

const mapDispatchToProps = {
  handlePlayPress,
  skipToNext,
  skipToPrevious,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
