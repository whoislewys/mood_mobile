import React from 'react';
import {
  FlatList,
} from 'react-native';
import Images from '@assets/images'
import Mood from './mood';
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

  _getMoodTiles = () => [...this._generateMoodTiles()];

  * _generateMoodTiles() {
    for (let i = 0; i < this.props.moods.length; i++) {
      yield this.props.moods[i];
    }

    const mysteryMoodTile = {
      file: Images.mysteryMoodTile,
      id: 69,
    };
    yield mysteryMoodTile;

    try {
      // If there is no featured song, `this.props.featuredSong.artwork` will throw an error
      // let's catch it.
      const featuredSongTile = {
        file: this.props.featuredSong.artwork,
        id: 99,
      };
      yield featuredSongTile;
    } catch (e) {
      console.warn(e);
    }
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
