import React, { Component } from 'react';
import {
  View,
  NetInfo,
  Linking,
  Alert,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import branch from 'react-native-branch';
import DeviceInfo from 'react-native-device-info';
import { logEvent, setDeviceInfo } from '../../redux/modules/analytics';
import { loadMoods } from '../../redux/modules/mood';
import { loadSharedSongQueue } from '../../redux/modules/queue';
import { anal } from '../../redux/constants';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internetCheck: null,
    };
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidMount = async () => {
    this.props.setDeviceInfo(DeviceInfo.getUniqueID(), DeviceInfo.isEmulator());

    this.props.logEvent(anal.appOpen);

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    this.props.loadMoods();

    this.updateNumLaunches();

    let channel = null;

    branch.subscribe(({ error, params }) => {
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
      console.warn(referralChannel);
      // console.log(referralChannel);
      // for (let propertyName in params) {
      //   // propertyName is what you want
      //   // you can get the value like this: myObject[propertyName]
      //   if (propertyName.endsWith('channel')) {
      //     console.warn(propertyName);
      //     referralChannel = propertyName;
      //   }
      //   console.log(params[referralChannel]);
      // }

      // const referralChannel = params.[~channel];
      if (!params.$canonical_identifier) {
        // Indicates user clicked a link without track params attached
        console.log(params);
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
      const { navigate } = this.props.navigation;
      this.props.loadSharedSongQueue(sharedTrack)
        .then(navigate({ routeName: 'Play', params: { visible: false, parentScreen: 'Splash' } }));
    });
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  };

  shouldComponentUpdate = () => {
    let shouldUpdate = true;
    if (this.props.moods != null && this.props.moods.length > 0) {
      shouldUpdate = false;
    }
    return shouldUpdate;
  };

  componentDidUpdate = () => {
    if (this.props.moods.length > 0) {
      this.navigateToMoodScreen();
    }
  };

  updateNumLaunches = async () => {
    let launches = await this.getLogins();
    let reviewed = await this.getReviewed();

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
    let logins = await AsyncStorage.getItem('logins');
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
            Linking.openURL('https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk');
            this.setReviewed('true');
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
  loading: state.mood.loading,
  error: state.mood.error,
});

const mapDispatchToProps = {
  loadMoods,
  loadSharedSongQueue,
  setDeviceInfo,
  logEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
