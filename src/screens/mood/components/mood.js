import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 7,
  },
  moodArt: {
    resizeMode: 'contain',
    width: width * 0.94,
    height: width * 0.94,
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

  // commented out from touchable opacity
  // disabled={this.props.selected !== -1}
  // it was disabling the "touchablility" of the component
  render = () => (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handlePress}
        >
        <View style={styles.tile}>
          <Image style={styles.moodArt} source={{ uri: this.props.mood.file }}></Image>
        </View>
      </TouchableOpacity>
  )
}
