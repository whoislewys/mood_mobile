import React from 'react';
import {
  FlatList,
} from 'react-native';
import Images from '@assets/images';
import Mood from './mood';

export default class MoodList extends React.Component {
  render = () => (
    <FlatList
      style={{ flex: 1 }}
      data={this._getMoodTiles()}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
      numColumns={2}
    />
  );

  _keyExtractor = mood => mood.name;

  _renderItem = ({ item }) => (
    <Mood
      mood={item}
      selected={this.props.selected}
      onPressMoodTile={this.props.playMusicForMoodTile}
    />
  );

  _getMoodTiles = () => {
    const mysteryMoodTile = {
      file: Images.mysteryMoodTile,
      id: 69,
    };

    let featuredSongTile = null;
    try {
      // If there is no featured song, `this.props.featuredSong.artwork` will throw an error.
      // Let's catch it.
      featuredSongTile = {
        file: this.props.featuredSong.artwork,
        id: 99,
      };
    } catch (e) {}

    return this.props.moods.concat([mysteryMoodTile, featuredSongTile]);
  };
}
