import React from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import Mood from './mood';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
});

export default React.createClass({
  mapMoodsToList(moods) {
    return moods.map((mood, index) => {
      return <Mood
        mood={mood}
        key={index}
        setMood={this.props.setMood}
        selected={this.props.selected}
        id={index}
      />
    });
  },
  render() {
    return (
      <View style={styles.container}>
        { this.mapMoodsToList(this.props.moods) }
      </View>
    );
  },
});
