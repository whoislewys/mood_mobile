import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import RNRestart from 'react-native-restart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainText: {
    fontWeight: '700',
    fontSize: 18,
  },
  subText: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default class ErrorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internetCheck: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      internetCheck:
      setInterval(this.checkConnectivity, 1000),
    });
  }

  checkConnectivity = async () => {
    const isConnected = await axios.get('https://www.google.com').catch(() => {});
    if (isConnected) {
      clearInterval(this.state.internetCheck);
      RNRestart.Restart();
    }
  }

  navigateToSplashScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Splash',
      params: { ...params },
    });
  }

  render = () => (
      <View style={styles.container}>
        <Text style={styles.mainText}>Could not connect to server!</Text>
        <Text style={styles.subText}>Please make sure you are connected to the internet.</Text>
      </View>
  )
}
