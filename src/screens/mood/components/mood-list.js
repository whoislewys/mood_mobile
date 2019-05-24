import React from 'react';
import {
  FlatList,
} from 'react-native';
import Mood from './mood';

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
        data={this.props.moods}
        keyExtractor={this.keyExtractor}
        renderItem={this._renderItem}
        numColumns={2}
        scrollEnabled={false}
      />
    );
  }
}
