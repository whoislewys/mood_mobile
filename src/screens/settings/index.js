import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Images from '@assets/images';
import ToggleSwitch from '../../components/toggle-switch';
import { fonts, colors } from '../../assets/styles';
import { userLoggedOut } from '../../redux/modules/auth';
import { handleDataToggle } from '../../redux/modules/settings';
import GradientButton from '../../components/GradientButton';
import MoodCenterHeader from '../../components/headers/MoodCenterHeader';

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
  buttonPadding: {
    marginRight: '5%',
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
  _navigateToMoodScreen = (params = {}) => {
    this.props.navigation.navigate({
      routeName: 'Mood',
      params: { ...params, visible: true },
    });
  };

  settingsHeader = () => (
    <MoodCenterHeader
      title='Settings'
      leftButtonIcon={Images.arrowLeft}
      onPressLeftButton={this._navigateToMoodScreen}
    />
  );

  render = () => {
    return (
      <View style={styles.container} testID='SettingsScreen-View'>
        <FlatList
          testID='SettingsItemsFlatList'
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
              settingName: 'Privacy Policy',
              url: 'https://docs.google.com/document/d/1c2Os5qrUO1vPD-noTqL-6KTLI_uOqhZ_W0HhoYsPVlE/edit?usp=sharing',
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
          ListHeaderComponent={this.settingsHeader()}
          ListFooterComponent={this.footerElem}
        />
      </View>
    );
  };

  _keyExtractor = item => item.key;

  logout = async () => {
    // if (!this.props.userIsLoggedIn) {
    //   Alert.alert('Already logged out!', null);
    //   return;
    // }
    try {
      firebase.auth().signOut();
      this.props.userLoggedOut();
      Alert.alert('Logout Successful!', null);
    } catch (error) {
      Alert.alert('Already logged out!', null);
    }
  };

  footerElem = () => (
    <Text style={[styles.textRow, styles.copyrightText]}>
      © 2020 Mood Industries LLC, all rights reserved.
    </Text>
  );

  onPressLinkButton = (url) => {
    this.props.navigation.navigate({
      routeName: 'FullScreenWebView',
      params: {
        url,
      },
    });
  };

  renderListItem = elem => (
    <TouchableOpacity
      accessible={false}
      testID={`SettingsItem-${elem}`}
      activeOpacity={0.6}
      style={styles.button}
      onPress={() => elem.item.handlePress(elem.item.url)}
    >
      <View style={styles.detailsContainer} testID={`SettingsItem-View-${elem}`}>
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
            <View style={styles.switchStyle} testID={`SettingsItem-ToggleView-${elem}`}>
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
            <View style={styles.buttonPadding} testID={`SettingsItem-ButtonPadding-${elem}`}>
              <GradientButton
                onPress={() => elem.item.handlePress(elem.item.url)}
                text={elem.item.buttonText}
              />
            </View>
          )
      }
    </TouchableOpacity>
  )
}

const mapStateToProps = state => ({
  dataShouldBeTracked: state.settings.dataShouldBeTracked,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  userLoggedOut,
  handleDataToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
