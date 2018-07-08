import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  NetInfo
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import RNRestart from 'react-native-restart';
import Images from '@assets/images';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainText: {
    fontWeight: "700",
    fontSize: 18,
  },
  subText: {
    fontWeight: "400",
    fontSize: 16
  }
});

export default class ErrorScreen extends React.Component {
  state = {
    internetCheck: false
  };

  componentDidMount = () => {
    this.setState({internetCheck:
      setInterval(this.checkConnectivity, 1000)
    });
  }

  checkConnectivity = async () => {
    let isConnected = await fetch("https://www.google.com").catch((error) => {});
    if(isConnected) {
      clearInterval(this.state.internetCheck);
      RNRestart.Restart();
    }
  }

  navigateToSplashScreen = (params) => {
    const navigate = NavigationActions.navigate({
      routeName: 'Splash',
      params: { ...params }
    });

    this.props.navigation.dispatch(navigate);
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Could not connect to server!</Text>
        <Text style={styles.subText}>Please make sure you are connected to the internet.</Text>
      </View>
    );
  }
}
