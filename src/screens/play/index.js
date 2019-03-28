import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Images from '@assets/images';
import Carousel from 'react-native-snap-carousel';
import GestureRecognizer from 'react-native-swipe-gestures';
import AlbumArtCarouselItem from './components/album-art-carousel-item';
import PlayOnOpen from './components/play-on-open';
import PlayControls from './components/play-controls';
import TimeBar from './components/time-bar';
import InfoText from './components/info-text';
import Background from '../../components/background';
import { dimensions } from '../../assets/styles';
import {
  handlePlayPress,
  skipToNext,
  skipToPrevious,
} from '../../redux/modules/queue';
import { logEvent } from '../../redux/modules/analytics';

const styles = StyleSheet.create({
  playContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: '5.9%',
    marginRight: '5.9%',
  },
  dropdownBarContainer: {
    flex: 9,
  },
  dropdownBarSwipeable: {
    flex: 1,
    flexDirection: 'row',
  },
  dropdownBarTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backButtonContainer: {
    marginLeft: '1.8%',
    paddingBottom: '15%',
    justifyContent: 'flex-end',
  },
  backButton: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  albumArtContainer: {
    flex: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  playBarContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfoContainer: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playControlsContainer: {
    flex: 15,
  },
});


class PlayScreen extends Component {
  _carouselref;

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
  }

  onSwipeDown() {
    if (!this.props.queue.length) {
      Alert.alert('Let\'s pick a mood first! 🎧');
      return;
    }
    this.props.navigation.goBack();
  }

  render = () => {
    if (!this.props.queue.length || (this.props.curTrack == null)) {
      return (
        <ActivityIndicator
          color='black'
          size='large'
          animating
          style={{ flex: 10 }}
        />
      );
    }

    return (
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => this.onSwipeDown()}
      >
        <Background
          image={{ uri: this.props.curTrack.artwork }}
          blur={25}
          bottom={0}
        >
          <PlayOnOpen
            playing={this.props.playing}
            playByDefault={this.props.handlePlayPress}
            parentScreen={this.props.parentScreen}
          />
          <View style={styles.playContainer}>
            <View style={styles.dropdownBarContainer}>
              { this.getDropdownBar() }
            </View>
            <View style={styles.albumArtContainer}>
              { this.getAlbumArtCarousel() }
            </View>
            <View style={styles.playBarContainer}>
              <TimeBar setTime={this.props.setTime} />
            </View>
            <View style={styles.trackInfoContainer}>
              { this.getTrackInfoAndPlaybar() }
            </View>
            <View style={styles.playControlsContainer}>
              { this.getPlayControls() }
            </View>
          </View>
        </Background>
      </GestureRecognizer>
    );
  };

  _nextTrack = () => {
    this.props.skipToNext();
    this._carouselref.snapToItem(this.props.curTrackIndex);
  };

  _previousTrack = () => {
    // args: snapToNext(animated, fireCallback)
    this.props.skipToPrevious();
    this._carouselref.snapToItem(this.props.curTrackIndex);
  };

  getDropdownBar = () => {
    return (
      <View
        style={styles.dropdownBarSwipeable}
        onSwipeDown={() => this.onSwipeDown()}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Mood')}
          activeOpacity={1}
          style={styles.dropdownBarTouchable}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Mood')}
            style={styles.backButtonContainer}
            activeOpacity={1}
          >
            <Image source={Images.arrowDown} style={styles.backButton} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  _renderCarouselItem = ({ item }) => {
    const art = item.artwork;
    return <AlbumArtCarouselItem artwork={art} />;
  };

  _handleCarouselSnap = (slideIndex) => {
    if (slideIndex > this._carouselref.currentIndex) {
      this.props.skipToNext();
    } else if (slideIndex < this._carouselref.currentIndex) {
      this.props.skipToPrevious();
    }
  };

  getAlbumArtCarousel = () => {
    return (
      <Carousel
        ref={(c) => { this._carouselref = c; }}
        data={this.props.queue}
        sliderWidth={dimensions.width}
        itemWidth={dimensions.width}
        renderItem={this._renderCarouselItem}
        onBeforeSnapToItem={this._handleCarouselSnap}
        firstItem={this.props.curTrackIndex}
        lockScrollWhileSnapping
      />
    );
  };

  getTrackInfoAndPlaybar = () => {
    return (
      <InfoText
        setTime={this.props.setTime}
        track={this.props.curTrack}
      />
    );
  };

  getPlayControls = () => {
    return (
      <PlayControls
        logEvent={this.props.logEvent}
        skipForward={this._nextTrack}
        skipBack={this._previousTrack}
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
  curTrackIndex: state.queue.curTrackIndex,
  deviceId: state.analytics.deviceId,
});

const mapDispatchToProps = {
  logEvent,
  handlePlayPress,
  skipToNext,
  skipToPrevious,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
