import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { dimensions } from '../../../assets/styles';

const { width } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  moodArt: {
    resizeMode: 'contain',
    width: width * 0.49,
    height: width * 0.49,
    backgroundColor: 'red',
  },
  tile: {
    flex: 1,
    alignItems: 'center',
  },
});

export default class Mood extends React.Component {
  render = () => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => this.props.onPressMoodTile(this.props.mood)}
      activeOpacity={0.5}
    >
      <View style={styles.tile}>
        { this.getMoodTileImage(this.props.mood.id) }
      </View>
    </TouchableOpacity>
  );

  getMoodTileImage = (id) => {
    if (id === 69) {
      return <Image style={styles.moodArt} source={this.props.mood.file} />;
    }
    return <Image style={styles.moodArt} source={{ uri: this.props.mood.file }} />;
  };
}
