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
import branch, { BranchEvent } from 'react-native-branch';
import PlayOnOpen from './components/play-on-open';
import PlayControls from './components/play-controls';
import TrackInfo from './components/track-info';
import Background from '../../components/background';
import { dimensions } from '../../assets/styles';
import Images from '@assets/images';

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
    // option 2: set a timer that triggers api call every so often,
    // sending currentTrack.score as scoreDelta.
    // also resets currentTrack.score to 0
    // (max score would still be 25 as this is held in the star component)

    // option 3: call api with currentTrack.score as scoreDelta when:
    // * track ends
    // * user has reached max claps
    // * app closes

    /*

    problems with option 1 (api call every time a star is given, see queue.js module):
    uses 25 times more data than other options. but, 25 integer objects still isn't much data
    space complexity upper bound of 25n. Every additional user can send 25 API calls
    summary: more intensive

    benefits:
    no stars lost ever. essentially option 2 with timer set to 0 seconds
    ***

    problems with option 2:
    if user stars song in last x seconds, stars will be lost
    if user stars song then switches song in under x seconds, stars will be lost
    if user stars song and closes app in under x seconds, stars will be lost
    summary:
    large x, more stars will be lost
    small x, less stars lost, more potential for gaming system (because less of the song has to be listened to)

    benefits:
    if x is set to under 1 second, api calls would be reduced by half or more,
    and user's data would be less taxed
    if x is set to <1 second, gives very little surface area for stars to be lost
    if x is larger, prevents gaming the system by rapidly skipping back and forth
    between tracks to inflate ratings

    ***

    problems with option 3:
    if locking phone counts as closing the app,
    every time a user locks then unlocks phone while listening to a song,
    a duplicate score will be sent.

    or if going to multitasking screen counts as closing the app,
    then user can go to multitasking, click the app, go to multitasking, and repeat
    to repeatedly send 25 stars.
    less likely but possible
    if skipforward or skipbackward send onTrackEnd event, then system is easily gamed.
    summary: if calling functions when closing app is unreliable, duplicate stars
    can be sent & abused, artificially inflating ratings

    benefits:
    no stars lost ever

    ***

    option 4 (2 & 3 hybrid):
    timer with x = 6 seconds sends ranking. 5 secs is max star time + 1 second makes it so user
    has to listen to a bit of song before stars are sent. prevents gaming the system
    also send stars onTrackEnd.
    if skipforward or skipbackward send onTrackEnd, then this is useless.
    but also, option 3 would be useless

    */

    // const { goBack } = this.props.navigation;

    return (this.props.queue.length
      // TODO: refactor to get rid of trackInfo
      // and add each of it's child components separately
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
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Mood')} style={styles.backButton}>
                <Image source={Images.arrowDown} />
              </TouchableOpacity>
            </View>
            <View style={styles.trackInfoContainer}>
              <TrackInfo
                skipForward={this.props.nextTrack}
                skipBack={this.props.previousTrack}
                track={this.props.currentTrack}
                setTime={this.props.setTime}
              />
            </View>
            <View style={styles.playControlsContainer}>
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
                currentTrack={this.props.currentTrack}
              />
            </View>
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
  currentScore: state.queue.currentScore,
  currentTrack: state.queue.currentTrack,
});

export default connect(mapStateToProps)(PlayScreen);
