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
    opacity: 0.5,
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
      // TODO: refactor so trackInfo and Playbar are separate components
      <Background
        image={{ uri: this.props.curTrack.artwork }}
        blur={25}
        height={dimensions.height}
        bottom={0}
      >
        <View style={styles.playContainer}>
          { this.getDropdownBar() }
          <View style={styles.trackInfoContainer}>
            { this.getAlbumArt() }
            { this.getTrackInfoAndPlaybar() }
          </View>
          { this.getPlayControls() }
        </View>
      </Background>
    );
  }

  // _skipToNext = () => {
  //   // TODO: implement a snap for when track ends
  //   // info on how to do 'ontrackend' stuff in github issues on react-native-track-player
  //   // args: snapToNext(animated, fireCallback)
  //   // this._carouselref.snapToNext(true, false);
  //   this._carouselref.snapToNext(true, false);
  //   this._skipToNext();
  // }

  // _skipToPrevious = () => {
  //   // args: snapToNext(animated, fireCallback)
  //   this._carouselref.snapToPrev(true, false);
  //   this._skipToPrevious();
  // }

  getDropdownBar = () => {
    return (
      <View style={styles.dropdownBar}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Mood')} style={styles.backButton}>
          <Image source={Images.arrowDown} />
        </TouchableOpacity>
      </View>
    );
  }

  // _renderCarouselItem = ({ item }) => {
  //   let art = item.artwork !== undefined && item.artwork !== null ? item.artwork : 'https://i1.sndcdn.com/artworks-000232798771-b7p886-t500x500.jpg';
  //   return <AlbumArtCarouselItem artwork={art}/>;
  // }
  //
  // _handleCarouselSnap = (slideIndex) => {
  //   if (slideIndex > this._carouselref.currentIndex) {
  //     this._skipToNext();
  //   } else if (slideIndex < this._carouselref.currentIndex) {
  //     this._skipToPrevious();
  //   }
  // }

  // getAlbumArtCarousel = () => {
  //   // TODO: use the onSnapToItem() callback to move backwards and forwards through tracks
  //   // TODO: docs here: https://github.com/archriss/react-native-snap-carousel/blob/master/doc/PROPS_METHODS_AND_GETTERS.md#callbacks
  //   return (
  //     <Carousel
  //       ref={(c) => { this._carouselref = c; }}
  //       data={this.props.queue}
  //       sliderWidth={dimensions.width}
  //       itemWidth={dimensions.width}
  //       renderItem={this._renderCarouselItem}
  //       onBeforeSnapToItem={this._handleCarouselSnap}
  //       firstItem={this.props.curTrackIndex}
  //       lockScrollWhileSnapping={true}
  //     />
  //   );
  // }

  getTrackInfoAndPlaybar = () => (
      <TrackInfo
        skipForward={this.props.skipToNext}
        skipBack={this.props.skipToPrevious}
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
        skipForward={this.props.skipToNext}
        skipBack={this.props.skipToPrevious}
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
});

const mapDispatchToProps = {
  handlePlayPress,
  skipToNext,
  skipToPrevious,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
