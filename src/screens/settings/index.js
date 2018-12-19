import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  Image,
  FlatList,
  Switch,
} from 'react-native';
import Images from '@assets/images';
import { connect } from 'react-redux';
import ToggleSwitch from '../../components/toggle-switch';
import Header from './components/header';
import { dimensions, fonts, colors } from '../../assets/styles';

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
  section: {
    flex: 1,
    borderColor: '#bbb',
    // padding: 20,
    flexDirection: 'column',
  },
  headText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.primary,
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: fonts.primary,
    fontSize: fonts.subHeader,
    color: '#555',
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
    marginBottom: 15,
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
  },
  buttonImage: {
    width: 71,
    height: 31,
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
    backgroundColor: '#FFFFFF',
    marginTop: -3,
  },
});

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      filterExplicit: true,
    };
  }

  _keyExtractor = item => item.text;

  onToggle = () => {
    console.log('toggled!');
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  }

  onPressLinkButton = (url) => {
    Linking.openURL(url);
  }

  renderListItem = elem => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={() => elem.item.handlePress(elem.item.url)} >
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
      elem.item.switchExists === true
        ? (
          <View style={styles.switchStyle}>
            <ToggleSwitch
            value={this.state.isActive}
            buttonWidth={51}
            buttonHeight={31}
            buttonRadius={50}
            buttonOnColor={colors.green}
            buttonOffColor={'rgba(0,0,0,0.1)'}
            sliderWidth={27}
            sliderHeight={27}
            sliderRadius={50}
            sliderOnColor={'white'}
            sliderOffColor={'white'}
            onToggle={newState => this.setState(prevState => ({
              isActive: !prevState.isActive,
            }))}
            />
          </View>
        )
        : <TouchableOpacity style={styles.buttonImageContainer} onPress={() => elem.item.handlePress(elem.item.url)} >
            <Image source={elem.item.image} style={styles.buttonImage}/>
        </TouchableOpacity>
      }
    </TouchableOpacity>
  )

  footerElem = () => (
    <Text style={[styles.textRow, styles.copyrightText]}>
      © 2019 Mood Industries LLC, all rights reserved.
    </Text>
  )

  render = () => {
    // const { goBack } = this.props.navigation; // preferred method from react-navigation docs https://reactnavigation.org/docs/en/navigation-prop.html
    StatusBar.setBarStyle('dark-content', true);

    return (
      <View>
        <FlatList
          data={[{
            url: 'http://moodindustries.com/privacy.pdf',
            settingName: 'Explicit',
            settingInfo: 'Allow playback of explicit music.',
            switchExists: true,
            handlePress: this.onToggle,
          }, {
            url: 'https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk',
            settingName: 'Rate & Review',
            settingInfo: 'Tell us about your experience.',
            handlePress: this.onPressLinkButton,
            switchExists: false,
            image: Images.doIt,
          }, {
            url: 'http://moodindustries.com/privacy.pdf',
            settingName: 'Terms of Use',
            settingInfo: 'All the stuff you need to know.',
            handlePress: this.onPressLinkButton,
            switchExists: false,
            image: Images.view,
          },
          ]}
          renderItem={this.renderListItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={Header({ headerText: 'Settings', moodscreen: this.props.moodscreen.bind(this) })}
          ListFooterComponent={this.footerElem}>
        </FlatList>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  queue: state.queue,
});

export default connect(mapStateToProps)(SettingsScreen);
