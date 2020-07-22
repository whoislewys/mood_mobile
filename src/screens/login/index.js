import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import Images from '@assets/images';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import GestureRecognizer from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import {
  colors,
  dimensions,
  fonts,
  spacing,
} from '../../assets/styles';
import config from './config';
import { userLoggedIn } from '../../redux/modules/auth';
import { setUserId, logEvent } from '../../redux/modules/analytics';
import { anal } from '../../redux/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.5,
    top: -1 * dimensions.height,
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
  signInButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: spacing.md,
    width: dimensions.width * 0.6107,
    height: dimensions.width * 0.6107 / 5.725,
    borderRadius: 4,
    elevation: 3,
    shadowRadius: 4.0,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
    },
  },
  signInButtonIconContainer: {
    flex: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  signInButtonIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  signInButtonText: {
    flex: 80,
    alignSelf: 'center',
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
    color: colors.black,
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
    width: '60%',
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
      showSpinner: false,
    };
  }


  async componentDidMount() {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  }

  renderGoogleSigninButton = () => (
    this.state.showSpinner
      ? <ActivityIndicator color='black' size='large' animating style={{ marginTop: spacing.lg }} />
      : (
        <TouchableOpacity style={styles.signInButton} onPress={() => this._signIn()} activeOpacity={0.6}>
          <View style={styles.signInButtonIconContainer}>
            <Image style={styles.signInButtonIcon} source={Images.googleIcon} />
          </View>
          <Text style={styles.signInButtonText}>Login with Google</Text>
        </TouchableOpacity>
      )
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.blackBackground} />
        <GestureRecognizer style={styles.modalContents} onSwipe={() => this.onSwipe()}>
          <Image source={Images.moodLogo} style={styles.moodLogo} borderRadius={10} />
          { this.renderGoogleSigninButton() }
          <View style={styles.tos}>
            <Text style={{ textAlign: 'center' }}>
              {'By signing in, you agree to Mood\'s '}
              {/* <Text onPress={this._openTos} style={styles.linkText}>Terms & Conditions</Text> */}
              {/* {' and '} */}
              <Text onPress={this._ppTouch} style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </GestureRecognizer>
      </View>
    );
  }

  onSwipe = () => {
    this.props.navigation.goBack();
  };

  // static _openTos() {
  //   Linking.openURL('https://www.example.com');
  // }

  _ppTouch = () => {
    this.props.navigation.navigate({
      routeName: 'FullScreenWebView',
      params: {
        url: 'https://docs.google.com/document/d/1c2Os5qrUO1vPD-noTqL-6KTLI_uOqhZ_W0HhoYsPVlE/edit?usp=sharing',
      },
    });
  };

  _signIn = async () => {
    try {
      this.setState({ showSpinner: true });
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      const currentUser = await firebase.auth().signInWithCredential(credential);

      this.props.userLoggedIn(currentUser.user);
      this.props.setUserId(currentUser.user.uid);
      this.props.logEvent(anal.login);

      Alert.alert('Logged in!', null);
      this.props.navigation.goBack();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // they cancelled, all good
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', null);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services not Available', null);
      } else {
        Alert.alert('Something Went Wrong', error.toString());
      }
    } finally {
      this.setState({ showSpinner: false });
    }
  };
}

const mapDispatchToProps = {
  logEvent,
  setUserId,
  userLoggedIn,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
