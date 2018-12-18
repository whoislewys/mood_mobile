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
import FlipToggle from 'react-native-flip-toggle-button';
import Images from '@assets/images';
import { connect } from 'react-redux';
import { dimensions, fonts, colors } from '../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  body: {
    flex: 95,
  },
  shadow: {
    flex: 1,
    height: 50,
    padding: 15,
    paddingTop: 55,
    paddingBottom: 25,
    zIndex: 3,
    marginBottom: 15,
    marginTop: 15,
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
  link: {
    color: '#0B0080',
    textDecorationLine: 'underline',
  },
  arrow: {
    width: 15.22,
    height: 25,
    marginLeft: 20,
    marginBottom: 2,
    tintColor: 'black',
    opacity: 0.7,
    resizeMode: 'contain',
  },
  gradientHeading: {
    flex: 1,
    resizeMode: 'stretch',
    maxHeight: 1.5,
    maxWidth: dimensions.width,
    marginLeft: 0,
  },
  bigButton: {
    resizeMode: 'contain',
    width: dimensions.width * 0.54,
    height: 117,
  },
  button: {
    flex: 1,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: fonts.subHeader,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: fonts.subHeader,
    color: '#555',
    fontFamily: fonts.primary,
    marginLeft: '3%',
    textAlign: 'center',
  },
  switchStyle: {
    marginRight: '5%',
  },
  copyrightText: {
    fontSize: fonts.body,
  },
  toggleLabel: {
    fontSize: 15,
    color: 'white',
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
    <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => elem.item.handlePress(elem.item.url)}>
      <Text style={styles.buttonText}>{elem.item.text}</Text>
      { elem.item.switchExists === true
        ? (
          <View style={styles.switchStyle}>
            <FlipToggle
            value={this.state.isActive}
            buttonWidth={80}
            buttonHeight={30}
            buttonRadius={50}
            buttonOnColor={'rgba(0,0,0,0.6)'}
            buttonOffColor={'rgba(0,0,0,0.1)'}
            sliderWidth={26}
            sliderHeight={26}
            sliderRadius={50}
            sliderOnColor={'white'}
            sliderOffColor={'white'}
            onLabel={'😈'}
            offLabel={'👼'}
            labelStyle={styles.toggleLabel}
            onToggle={newState => this.setState(prevState => ({
              isActive: !prevState.isActive,
            }))}
            />
          </View>
        )
        : <View />
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
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this.props.moodscreen} style={{ alignSelf: 'center', width: 25, marginRight: 10 }}>
              <Image source={Images.arrowLeft} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </View>
        <Image source={Images.gradientHeading} style={styles.gradientHeading} />
        <View style={styles.body}>
          <View style={styles.section}>
            <FlatList
              data={[{
                url: 'https://docs.google.com/forms/d/1Dh8RjPtftLzvWAkf7XfGl_vZCo268rQ8P3r8noPOcIk/edit?usp=drivesdk',
                text: 'Rate & Review',
                handlePress: this.onPressLinkButton,
                switchExists: false,
              }, {
                url: 'http://moodindustries.com/privacy.pdf',
                text: 'Terms of Use',
                handlePress: this.onPressLinkButton,
                switchExists: false,
              }, {
                url: 'http://moodindustries.com/privacy.pdf',
                text: 'Explicit',
                switchExists: true,
                handlePress: this.onToggle,
              },
              ]}
              renderItem={this.renderListItem}
              keyExtractor={this._keyExtractor}
              ListFooterComponent={this.footerElem}>
            </FlatList>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  queue: state.queue,
});

export default connect(mapStateToProps)(SettingsScreen);
