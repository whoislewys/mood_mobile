import React from 'react';
import {
  FlatList,
} from 'react-native';
import Mood from './mood';
import Images from '@assets/images'
import { tileConstants } from '../../../redux/constants';

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
    const mysteryMoodTile = {
      file: Images.mysteryMoodTile,
      id: 69,
    };
    // todo: figure out an elegant way to catch the featured song tile not being here
    const featuredSongTile = {
      file: this.props.featuredSong.artwork,
      id: 99,
    };
    const tiles = this.props.moods.concat([mysteryMoodTile, featuredSongTile]);
    return tiles;
  };

  _keyExtractor = mood => mood.name;

  onPressMoodTile = (moodObj) => {
    if (moodObj.id === tileConstants.MYSTERY) {
      const ids = this.props.moods.map(mood => mood.id);
      this.props.loadSongsForAllMoods(ids);
      this.props.playscreen();
    } else if (moodObj.id === tileConstants.FEATURED_SONG) {
      this.props.loadSharedSongQueue(this.props.featuredSong);
      this.props.playscreen();
    } else {
      this.props.loadSongsForMoodId(moodObj.id);
      this.props.playscreen();
    }
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
