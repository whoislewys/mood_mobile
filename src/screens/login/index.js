import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import Images from '@assets/images';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import GestureRecognizer from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import { fonts } from '../../assets/styles';
import config from './config';
import { userLoggedIn } from '../../redux/modules/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  moodLogo: {
    alignSelf: 'center',
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  signInMessage: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
  },
  googleIcon: {
    marginVertical: '10%',
    width: 46,
    height: 48,
  },
  tos: {
    fontFamily: fonts.primary,
    fontSize: fonts.body,
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    position: 'absolute',
    paddingBottom: '10%',
    bottom: 0,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  async componentDidMount() {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });

    await this._getCurrentUser();
  }

  render() {
    return (
      <GestureRecognizer style={styles.container} onSwipe={() => this.onSwipe()}>
        <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10} />
        <Text style={styles.signInMessage}>Sign in with</Text>
        <GoogleSigninButton
          style={styles.googleIcon}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn}
        />
        <View style={styles.tos}>
          <Text>
            {'By signing in, you agree to Mood\'s '}
            <Text onPress={LoginScreen._openTos} style={styles.linkText}>Terms & Conditions</Text>
            {' and '}
            <Text onPress={LoginScreen._ppTouch} style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </GestureRecognizer>
    );
  }

  onSwipe= () => {
    this.props.navigation.goBack();
  };

  static _openTos() {
    Linking.openURL('https://www.example.com');
  }

  static _ppTouch() {
    Linking.openURL('http://www.moodindustries.com/privacy.pdf');
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.props.userLoggedIn(userInfo);
      this.props.navigation.goBack();
      console.warn('curuser: ', this.state.userInfo);
      console.warn('err: ', this.state.error);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage = error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }
}

const mapDispatchToProps = {
  userLoggedIn,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
