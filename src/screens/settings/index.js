import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  ImageBackground,
  FlatList, Alert,
} from 'react-native';
import Images from '@assets/images';
import { connect } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import ToggleSwitch from '../../components/toggle-switch';
import Header from './components/header';
import { fonts, colors } from '../../assets/styles';
import { userLoggedOut } from '../../redux/modules/auth';
import { handleDataToggle } from '../../redux/modules/settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    flex: 1,
    color: '#555',
    fontSize: fonts.header,
    fontFamily: fonts.primary,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    paddingBottom: 4,
    marginRight: 35,
    height: 40,
  },
  textRow: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: '#FFFFFF',
  },
  switchStyle: {
    marginRight: '7%',
  },
  buttonImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 71,
    height: 31,
    marginRight: '7%',
    // TODO use borderradius when wil sends actual button
    // backgroundColor: 'tomato',
    // borderRadius: 4,
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  buttonImage: {
    width: 80,
    height: 32,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.primaryBold,
    fontSize: fonts.body,
    color: '#fff',
    marginLeft: 3,
  },
  copyrightText: {
    fontSize: fonts.body,
  },
  settingName: {
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
    color: colors.header,
  },
  settingInfo: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.body,
    color: colors.body,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: '7%',
    marginTop: -3,
  },
});

class SettingsScreen extends Component {
  render = () => {
    // const { goBack } = this.props.navigation;
    StatusBar.setBarStyle('dark-content', true);

    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {
              key: 'rate',
              buttonText: 'DO IT',
              handlePress: this.onPressLinkButton,
              image: Images.settingsButton,
              settingInfo: 'Tell us about your experience.',
              settingName: 'Rate & Review',
              url: 'https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk',
            }, {
              key: 'terms',
              buttonText: 'VIEW',
              handlePress: this.onPressLinkButton,
              image: Images.settingsButton,
              settingInfo: 'All the stuff you need to know.',
              settingName: 'Terms of Use',
              url: 'http://www.moodindustries.com/privacy.pdf',
            }, {
              key: 'logout',
              buttonText: 'LOGOUT',
              handlePress: this.logout,
              image: Images.settingsButton,
              settingInfo: 'Log out of your Mood account.',
              settingName: 'Logout',
            }, {
              key: 'DATA',
              buttonText: 'DATA',
              handlePress: this.props.handleDataToggle,
              hasSwitch: true,
              settingInfo: 'Stop sending app usage data',
              settingName: 'Data',
            },
          ]}
          renderItem={this.renderListItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={Header({ headerText: 'Settings', moodscreen: this.props.moodscreen.bind(this) })}
          ListFooterComponent={this.footerElem}
        />
      </View>
    );
  };

  _keyExtractor = item => item.key;

  logout = async () => {
    if (this.props.userIsLoggedIn) {
      Alert.alert('Already logged out!', null);
      return;
    }
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.userLoggedOut();
      Alert.alert('Logout Successful!', null);
    } catch (error) {
      Alert.alert('Already logged out!', null);
    }
  };

  footerElem = () => (
    <Text style={[styles.textRow, styles.copyrightText]}>
      © 2019 Mood Industries LLC, all rights reserved.
    </Text>
  );

  onPressLinkButton = (url) => {
    Linking.openURL(url);
  };

  renderListItem = elem => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={() => elem.item.handlePress(elem.item.url)}
    >
      <View style={styles.detailsContainer}>
        <Text
          style={styles.settingName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {elem.item.settingName}
        </Text>
        <Text style={styles.settingInfo}>{elem.item.settingInfo}</Text>
      </View>
      {
        elem.item.hasSwitch === true
          ? (
            <View style={styles.switchStyle}>
              <ToggleSwitch
                value={this.props.dataShouldBeTracked}
                buttonWidth={51}
                buttonHeight={31}
                buttonRadius={50}
                buttonOnColor={colors.green}
                buttonOffColor='rgba(0,0,0,0.1)'
                sliderWidth={27}
                sliderHeight={27}
                sliderRadius={50}
                sliderOnColor='white'
                sliderOffColor='white'
                onToggle={() => elem.item.handlePress()}
              />
            </View>
          )
          : (
            <TouchableOpacity
              style={styles.buttonImageContainer}
              onPress={() => elem.item.handlePress(elem.item.url)}
            >
              {/* <Image source={elem.item.image} style={styles.buttonImage} /> */}
              <ImageBackground source={elem.item.image} style={styles.buttonImage}>
                <Text style={styles.buttonText}>{elem.item.buttonText}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )
      }
    </TouchableOpacity>
  )
}

const mapStateToProps = state => ({
  dataShouldBeTracked: state.settings.dataShouldBeTracked,
  userIsLoggedIn: state.settings.userIsLoggedIn,
});

const mapDispatchToProps = {
  userLoggedOut,
  handleDataToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
