import React from 'react';
import {
  FlatList,
} from 'react-native';
import Mood from './mood';
import Images from '@assets/images'

export default class MoodList extends React.Component {
  render = () => (
    <FlatList
      data={this._getMoodTiles()}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
      numColumns={2}
    />
  );

  _getMoodTiles = () => {
    // Images.mysteryMoodTile;
    const mysteryMoodTile = {
      file: Images.mysteryMoodTile,
      id: 69,
    };
    return this.props.moods.concat([mysteryMoodTile]);
  };

  _keyExtractor = mood => mood.name;

  onPressMoodTile = (moodObj) => {
    if (moodObj.id === 69) {
      console.warn('mystery mood');
      const ids = this.props.moods.map(mood => mood.id);
      this.props.loadSongsForAllMoods(ids);
      this.props.playscreen();
    }
    this.props.loadSongsForMoodId(moodObj.id);
    this.props.playscreen();
  };

  _renderItem = ({ item }) => (
    <Mood
      mood={item}
      playscreen={this.props.playscreen}
      selected={this.props.selected}
      onPressMoodTile={this.onPressMoodTile}
    />
  );

}
