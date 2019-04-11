import React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import Mood from './mood';
import { fonts, colors, dimensions } from '../../../assets/styles';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingBottom: '15%',
    paddingTop: '7%',
    marginLeft: dimensions.width * 0.077,
    marginRight: dimensions.width * 0.077,
  },
  headerText: {
    fontFamily: fonts.primary,
    fontSize: fonts.header,
    color: colors.header,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '25%',
    justifyContent: 'space-between',
  },
  bugsButton: {
    height: 25,
    width: 25,
  },
  settingsButton: {
    height: 25,
    width: 25,
    marginLeft: '10%',
  },
  flatListStyle: {
    flexDirection: 'column',
  },
});

export default class MoodList extends React.Component {
  keyExtractor = mood => mood.name;

  settings = () => {
    this.props.settings();
  };

  onPressItem = (moodObj) => {
    this.props.loadSongsForMoodId(moodObj.id);
    this.props.playscreen();
  };

  // renderItem called when rendering FlatList. returns a Mood component
  _renderItem = ({ item }) => (
    <Mood
      mood={item}
      playscreen={this.props.playscreen}
      selected={this.props.selected}
      onPressItem={this.onPressItem}
    />
  );

  render = () => {
    return (
      <FlatList
        style={styles.flatListStyle}
        data={this.props.moods}
        keyExtractor={this.keyExtractor}
        renderItem={this._renderItem}
        numColumns={2}
        scrollEnabled={false}
      />
    );
  }
}
