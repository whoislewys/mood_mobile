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

  _keyExtractor = mood => mood.name;

  _renderItem = ({ item }) => (
    <Mood
      mood={item}
      playscreen={this.props.playscreen}
      selected={this.props.selected}
      onPressMoodTile={this.onPressMoodTile}
    />
  );

  _getMoodTiles = () => {
    const newTiles = [];
    for (const tile of this._generateMoodTiles()) {
      // todo: catch generator errors
      newTiles.push(tile);
      console.warn('new tiles: ', newTiles);
    }
    return newTiles;
  };

  * _generateMoodTiles() {
    for (let i = 0; i < this.props.moods.length; i++) {
      yield this.props.moods[i];
    }

    const mysteryMoodTile = {
      file: Images.mysteryMoodTile,
      id: 69,
    };
    yield mysteryMoodTile;

    const featuredSongTile = {
      file: this.props.featuredSong.artwork,
      id: 99,
    };
    yield featuredSongTile;
  }


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
}
