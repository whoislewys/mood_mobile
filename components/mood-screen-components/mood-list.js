import React from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import Mood from './mood';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default React.createClass({
  _keyExtractor(mood, index) {
    return index;
  },
  _renderItem({item, index}) {
    return <Mood
      mood={item}
      key={index}
      setMood={this.props.setMood}
      selected={this.props.selected}
      bg={this.props.moodBgs[index].bg}
      id={index}
    />
  },
  _renderHeader() {
    return <View style={{height: 10}}></View>;
  },

  mapMoodsToList(moods) {
    return moods.map((mood, index) => {
      return <Mood
        mood={mood}
        key={index}
        setMood={this.props.setMood}
        selected={this.props.selected}
        bg={this.props.moodBgs[index].bg}
        id={index}
      />
    });
  },
  render() {
    return (
      <FlatList
        data={this.props.moods}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        >

      </FlatList>
      // <View style={styles.container}>
      //   { this.mapMoodsToList(this.props.moods) }
      // </View>
    );
  },
});
