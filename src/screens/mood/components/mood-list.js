import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import Images from '@assets/images';
import Mood from './mood';
import { fonts, colors, dimensions } from '../../../assets/styles';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    marginTop: dimensions.height * 0.06,
    marginLeft: dimensions.width * 0.077,
    marginRight: dimensions.width * 0.077,
    marginBottom: 41.5,
    height: 96,
  },
  headerText: {
    alignSelf: 'flex-start',
    color: colors.header,
    fontFamily: fonts.primary,
    fontSize: fonts.header,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 38,
  },
  bugsButton: {
    height: 25,
    width: 25,
  },
  explicitSwitch: {
    transform: [{ scaleY: 0.89 }, { scaleX: 1.05 }],
    marginLeft: dimensions.width * 0.05,
    marginRight: dimensions.width * 0.05,
  },
  settingsButton: {
    height: 25,
    width: 25,
  },
});

export default class MoodList extends React.Component {
  keyExtractor = mood => mood.name

  settings = () => {
    this.props.settings();
  }

  playscreen = () => {
    this.props.playscreen();
  }

  onPressItem = (moodObj) => {
    this.props.loadSongsForMoodId(moodObj.id);
    this.props.playscreen();
  }

  // renderItem called when rendering FlatList. returns a Mood component
  _renderItem = ({ item }) => <Mood
      mood={item}
      playscreen={this.props.playscreen}
      selected={this.props.selected}
      onPressItem={this.onPressItem}
    />

  renderHeader = () => (
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => Linking.openURL('http://moodindustries.com/bug_reports/new')}>
            <Image source={Images.bugIcon} style={styles.bugsButton}/>
          </TouchableOpacity>
          <Switch
          trackColor={'red'}
          thumbColor={'red'}
          ios_backgroundColor={'tomato'}
          style={styles.explicitSwitch}
          value={true}
          />
          <TouchableOpacity onPress={this.settings}>
            <Image source={Images.settingsGear} style={styles.settingsButton}/>
          </TouchableOpacity>
        </View>
      </View>
  )

  // renderItem should be a function that returns a component
  render = () => {
    console.log(dimensions.width);
    return (
      <FlatList
        data={this.props.moods}
        keyExtractor={this.keyExtractor}
        renderItem={this._renderItem}
        ListHeaderComponent={this.renderHeader}
        >
      </FlatList>
    );
  }
}
