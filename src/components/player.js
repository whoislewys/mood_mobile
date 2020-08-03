import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import firebase from 'react-native-firebase';
import Navigator from '../navigation/app-navigator';
import { setUserId } from '../redux/modules/analytics';
import { userLoggedIn } from '../redux/modules/auth';
import { setMood } from '../redux/modules/mood';
import { stopPlayback } from '../redux/modules/queue';
import NavigationService from '../navigation/navigation-service';

class Player extends Component {
  componentDidMount = async () => {
    const { currentUser } = firebase.auth();
    // if user still has login info from a previous login, act as if they just signed in
    if (currentUser != null) {
      this.props.userLoggedIn(currentUser);
      this.props.setUserId(currentUser.uid);
    }
  };

  render = () => (
    <Navigator
      ref={
        (navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }
      }
      screenProps={{
        playing: this.props.playbackState === TrackPlayer.STATE_PLAYING,
        loading: this.props.loading,
        mood: this.props.selected,
        moodList: this.props.moods,
        stopPlayback: this.props.stopPlayback,
        setTime: TrackPlayer.seekTo,
      }}
    />
  )
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  loading: state.queue.loading,
  playbackState: state.queue.playbackState,
});

const mapDispatchToProps = {
  setMood,
  setUserId,
  stopPlayback,
  userLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
