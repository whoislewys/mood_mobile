import React, { Component } from 'react';
import {
  View,
  NetInfo,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import branch from 'react-native-branch';
import { loadMoods } from '../../redux/modules/mood';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internetCheck: null,
    };
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  openSharedTrack = async (sharedTrack) => {
    const { navigate } = this.props.navigation;
    // TODO: ensure that a full the queue load before inserting the sharedtrack
    this.props.loadSongsForMoodId(sharedTrack.mood_id);
    await this.props.handleShare(sharedTrack);
    navigate({ routeName: 'Play', params: { visible: false } });
  }

  componentDidMount = () => {
    this.props.loadMoods();
    this.setState({ shit: true });
    /*
    branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ', error);
        return;
      }

      // params will never be null if error is null

      if (params['+non_branch_link']) {
        const nonBranchUrl = params['+non_branch_link'];
        // Route non-Branch URL if appropriate.
        return;
      }

      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return;
      }

      // A Branch link was opened.
      // create track object from shared link's params
      const id = params.$canonical_identifier;
      const artwork = params.$og_image_url;
      const title = params.$og_title;
      const {
        album,
        artist,
        mood_id,
        url,
      } = params;
      const sharedTrack = {
        album,
        artist,
        artwork,
        id,
        mood_id: parseInt(mood_id, 10),
        title,
        url,
      };
      this.openSharedTrack(sharedTrack);
    });
    */
  }

  componentWillUnmount = () => {
    Linking.removeEventsListener('url', this.handleOpenURL);
  }

  shouldComponentUpdate = () => {
    let shouldUpdate = true;
    if (this.props.moods != null && this.props.moods.length > 0) {
      shouldUpdate = false;
    }
    return shouldUpdate;
  }

  componentDidUpdate = () => {
    if (this.props.moods.length > 0) {
      console.log('moods:', this.props.moods);
      // this.navigateToMoodScreen();
    }
  }

  handleConnectivityChange = (isConnected) => {
    if (!isConnected) {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this.handleConnectivityChange,
      );

      this.props.stopPlayback();
      this.navigateToErrorScreen();
    }
  }

  navigateToMoodScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Mood',
      params: { ...params, visible: true },
    });
  };

  navigateToErrorScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Error',
      params: { ...params },
    });
  };

  render = () => (<View style={{ flex: 1 }}></View>)
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  loading: state.mood.loading,
  error: state.mood.error,
});

const mapDispatchToProps = {
  loadMoods,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
