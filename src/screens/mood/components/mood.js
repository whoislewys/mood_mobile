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
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  moodArt: {
    resizeMode: 'contain',
    width: width * 0.49,
    height: width * 0.49,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
  },
});

export default class Mood extends React.Component {
  handlePress = () => {
    this.props.onPressItem(this.props.mood);
  }

  render = () => (
    <TouchableOpacity
      style={styles.container}
      onPress={this.handlePress}
      activeOpacity={0.5}
    >
      <View style={styles.tile}>
        <Image style={styles.moodArt} source={{ uri: this.props.mood.file }} />
      </View>
    </TouchableOpacity>
  )
}
