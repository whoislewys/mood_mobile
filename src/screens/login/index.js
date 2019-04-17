import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import firebase from 'react-native-firebase';
import Images from '@assets/images';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import GestureRecognizer from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import { dimensions, fonts, spacing } from '../../assets/styles';
import config from './config';
import { userLoggedIn } from '../../redux/modules/auth';
import { logEvent } from '../../redux/modules/analytics';
import { anal } from '../../redux/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContents: {
    height: dimensions.height * 0.5849,
    width: dimensions.width * 0.9307,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
  },
  moodLogo: {
    alignSelf: 'center',
    width: dimensions.width * 0.5333,
    height: dimensions.height * 0.1503,
    marginTop: spacing.sm,
    resizeMode: 'contain',
  },
  signInMessage: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
  },
  googleIcon: {
    marginTop: spacing.lg,
    height: spacing.lg,
    width: dimensions.width * 0.610,
  },
  tos: {
    fontFamily: fonts.primary,
    fontSize: fonts.body,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
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
  }

  render() {
    return (
      <View style={styles.container}>
        <GestureRecognizer style={styles.modalContents} onSwipe={() => this.onSwipe()}>
          <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10} />
          <GoogleSigninButton
            style={styles.googleIcon}
            size={GoogleSigninButton.Size.Wide}
            onPress={this._signIn}
          />
          <View style={styles.tos}>
            <Text style={{ textAlign: 'center' }}>
              {'By signing in, you agree to Mood\'s '}
              <Text onPress={LoginScreen._openTos} style={styles.linkText}>Terms & Conditions</Text>
              {' and '}
              <Text onPress={LoginScreen._ppTouch} style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </GestureRecognizer>
      </View>
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

  // react-native-firebase
  _signIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      const currentUser = await firebase.auth().signInWithCredential(credential);

      this.props.userLoggedIn(currentUser.user);
      this.props.logEvent(anal.login);

      Alert.alert('Logged in!', null);
      this.props.navigation.goBack();
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
}

const mapDispatchToProps = {
  userLoggedIn,
  logEvent,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
