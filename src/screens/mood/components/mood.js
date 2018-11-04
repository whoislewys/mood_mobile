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
    marginTop: 10,
    marginBottom: 30,
  },
  moodArt: {
    resizeMode: 'contain',
    width: width * 0.8,
    height: width * 0.8,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
  },
  art: {
    flex: 24,
    justifyContent: 'flex-start',
  },
  moodName: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  moodInfo: {
    color: '#555',
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  info: {
    flex: 80,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 65,
    marginLeft: 10,
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
