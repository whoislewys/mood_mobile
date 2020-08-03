import React, { Component } from 'react';
import {
  View,
  NetInfo,
  Alert,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import branch from 'react-native-branch';
import DeviceInfo from 'react-native-device-info';
import { logEvent, setDeviceInfo } from '../../redux/modules/analytics';
import { loadMoods, loadFeaturedSong } from '../../redux/modules/mood';
import { loadSharedSongQueue } from '../../redux/modules/queue';
import { anal } from '../../redux/constants';

class SplashScreen extends Component {
  _unsubscribeFromBranch = null;

  constructor(props) {
    super(props);
    this.state = {
      internetCheck: null,
    };
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidMount = async () => {
    this.props.setDeviceInfo(DeviceInfo.getUniqueID(), DeviceInfo.isEmulator());

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    this.props.loadMoods();
    this.props.loadFeaturedSong();

    this.updateNumLaunches();

    // Any initial link cached by the native layer will be returned to the callback supplied to branch.subscribe immediately if the JavaScript method is called for the first time after app launch.
    // In case, app does not need to receive the cached initial app launch link event, call branch.skipCachedEvents()
    branch.skipCachedEvents();

    this._unsubscribeFromBranch = branch.subscribe(({ error, params }) => {
      if (error) {
        return;
      }

      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return;
      }

      // A Branch link was opened.
      const referralChannel = params['~channel'];
      const campaign = params['~campaign'];
      const isFirstSession = params['+is_first_session'];
      this.props.logEvent(anal.deepLinkOpen, { referralChannel, campaign, isFirstSession });

      if (!params.$canonical_identifier) {
        // Indicates user clicked a link without track params attached
        return;
      }

      // Create a track object from the shared link's params
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

      // Play the shared track
      this.props.loadSharedSongQueue(sharedTrack);
    });
    // if you're here, no branch link was opened. continue to mood screen as usual
    this.props.logEvent(anal.appOpen);
    this.navigateToMoodScreen();
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    if (this._unsubscribeFromBranch) {
      this._unsubscribeFromBranch();
      this._unsubscribeFromBranch = null;
    }
  };

  shouldComponentUpdate = () => {
    let shouldUpdate = true;
    if (this.props.moods != null && this.props.moods.length > 0) {
      shouldUpdate = false;
    }
    return shouldUpdate;
  };

  updateNumLaunches = async () => {
    const launches = await this.getLogins();
    const reviewed = await this.getReviewed();

    try {
      if (isNaN(launches)) {
        this.setLogins(1);
      } else {
        this.setLogins(launches + 1);

        if ((launches === 3 || (launches - 3) % 6 === 0) && !reviewed) {
          this.showReviewModal();
        }
      }
    } catch (_) {}
  };

  setLogins = async (logins) => {
    await AsyncStorage.setItem('logins', logins.toString(10));
  };

  getLogins = async () => {
    const logins = await AsyncStorage.getItem('logins');
    return parseInt(logins, 10);
  };

  getReviewed = async () => (
    await AsyncStorage.getItem('reviewed')
  );

  setReviewed = async (reviewed) => {
    await AsyncStorage.setItem('reviewed', reviewed);
  };

  showReviewModal = () => {
    Alert.alert(
      'Your opinion matters to us!',
      'Please take a second to leave a review', // 'Please tap below to give us a review!',
      [
        {
          text: 'No thanks',
          style: 'default',
        },
        {
          text: 'Review!',
          onPress: () => {
            this.setReviewed('true');
            this.props.navigation.navigate({
              routeName: 'FullScreenWebView',
              params: {
                url: 'https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk',
              },
            });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  handleConnectivityChange = (isConnected) => {
    if (!isConnected) {
      this.props.stopPlayback();
      this.navigateToErrorScreen();
    }
  };

  onBackButtonPressAndroid = () => {
    // TODO: going forward, might need to move this function
    //  and related listeners outta here and implement for each screen
    this.props.navigation.navigate('Mood');
    return true;
  };

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

  render = () => (<View style={{ flex: 1 }} />)
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  error: state.mood.error,
});

const mapDispatchToProps = {
  loadMoods,
  loadFeaturedSong,
  loadSharedSongQueue,
  setDeviceInfo,
  logEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
