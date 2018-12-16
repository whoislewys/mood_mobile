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
import PlayOnOpen from './components/play-on-open';
import PlayControls from './components/play-controls';
import TrackInfo from './components/track-info';
import Background from '../../components/background';
import { fonts, dimensions } from '../../assets/styles';
import Images from '@assets/images';

const styles = StyleSheet.create({
  playContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: '5.9%',
    marginRight: '5.9%',
    backgroundColor: 'red',
  },
  dropdownBar: {
    height: '10.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  backButton: {
    opacity: 0.5,
    backgroundColor: 'black',
    marginTop: '10.5%',
    zIndex: 2,
  },
  touchable: {

  },
});


class PlayScreen extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
  }

  render = () => {
    // const { goBack } = this.props.navigation;

    return (this.props.queue.length
      // return playscreen if queue has 1 or more songs
      // remember adjacent things should be wrapped in upper level view tag
      ? (
        <Background
          image={{ uri: this.props.currentTrack.artwork }}
          blur={25}
          height={dimensions.height}
          bottom={0}
        >
          <PlayOnOpen playing={this.props.playing}
          playByDefault={this.props.handlePlayPress}
          parentScreen={this.props.parentScreen}
          />
          <View style={styles.playContainer}>
            <View style={styles.dropdownBar}>
              <TouchableOpacity onPress={this.props.moodscreen} style={styles.backButton}>
                <Image source={Images.arrowDown} />
              </TouchableOpacity>
            </View>
            <TrackInfo
              skipForward={this.props.nextTrack}
              skipBack={this.props.previousTrack}
              track={this.props.currentTrack}
              setTime={this.props.setTime}
            />
            <PlayControls
              shuffled={this.props.shuffled}
              repeat={this.props.repeat}
              toggleShuffle={this.props.toggleShuffle}
              toggleRepeat={this.props.toggleRepeat}
              skipForward={this.props.nextTrack}
              skipBack={this.props.previousTrack}
              playing={this.props.playing}
              handlePlayPress={this.props.handlePlayPress}
              loading={this.props.loading}
            />
          </View>
        </Background>
      )
      // return a spinner if queue is empty
      : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
    );
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue.queue,
});

export default connect(mapStateToProps)(PlayScreen);
