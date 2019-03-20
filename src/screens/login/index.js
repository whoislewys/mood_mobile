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
      Alert.alert('Logged in!', null);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // they cancelled, all good
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // `alert` signature: (title, message)
        Alert.alert('In Progress', null);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services not Available', null);
      } else {
        Alert.alert('Something Went Wrong', error.toString());
      }
    }
  };

  _getCurrentUser = async () => {
    // TODO: move this somehwere higher level so user auto auths on app open
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.props.userLoggedIn(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        Alert.alert('Please sign in to save songs :)', null);
      } else {
        // fail silently, user probably logged out & logged back in very quickly
      }
    }
  }
}

const mapDispatchToProps = {
  userLoggedIn,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
