import React, { Component } from 'react';
import {
  View,
  NetInfo,
  Linking,
  Alert,
  AsyncStorage,
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

  componentDidMount = async () => {
    this.props.loadMoods();
    branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ', error);
        return;
      }

      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return;
      }

      // A Branch link was opened.
      // create track object from shared link's params
      // console.log('branch link opened: ', params);
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
      if (!sharedTrack) return;
      const { navigate } = this.props.navigation;
      this.props.handleShare(sharedTrack)
        .then(navigate({ routeName: 'Play', params: { visible: false } }));
    });

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
    } catch (error) { }
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
      this.navigateToMoodScreen();
    }
  }

  setLogins = async (logins) => {
    await AsyncStorage.setItem('logins', logins.toString(10));
  }

  getLogins = async () => {
    let logins = await AsyncStorage.getItem('logins');
    return parseInt(logins, 10);
  };

  getReviewed = async () => (
    await AsyncStorage.getItem('reviewed')
  );

  setReviewed = async (reviewed) => {
    await AsyncStorage.setItem('reviewed', reviewed);
  }

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
  }

  updateLogins = () => {

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
