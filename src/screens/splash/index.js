import React, { Component } from 'react';
import {
  View,
  NetInfo,
} from 'react-native';
import { connect } from 'react-redux';

import { loadMoods } from '../../redux/modules/mood';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internetCheck: null,
    };

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidMount = () => {
    this.props.loadMoods();
  }

  componentDidUpdate = () => {
    if (this.props.moods.length > 0) {
      this.navigateToMoodScreen();
    }
  }

  handleConnectivityChange = (isConnected) => {
    console.log(isConnected);
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
      params: { ...params },
    });
  };

  navigateToErrorScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Error',
      params: { ...params },
    });
  };

  render = () => <View style={{ flex: 1 }}></View>
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
