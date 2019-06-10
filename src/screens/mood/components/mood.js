import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { dimensions, fonts } from '../../../assets/styles';
import { tileConstants } from '../../../redux/constants';

const { width } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4%',
  },
  moodArt: {
    resizeMode: 'contain',
    width: width * 0.44,
    height: width * 0.44,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  tile: {
    flex: 1,
    alignItems: 'center',
  },
  subTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  moodTileSubtextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodTextStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
    marginBottom: '6%',
  },
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: fonts.body,
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

  getFeaturedSongTile = () => (
    <ImageBackground style={styles.moodArt} source={{ uri: this.props.mood.file }}>
      <View style={styles.subTextContainer}>
        <Text style={styles.textStyle}>Song of the Week</Text>
      </View>
    </ImageBackground>
  );

  getMoodTileImage = (id) => {
    if (id === tileConstants.FEATURED_SONG) {
      return this.getFeaturedSongTile();
    }
    return (
      <ImageBackground style={styles.moodArt} source={this.props.mood.file}>
        <View style={styles.moodTileSubtextContainer}>
          <Text style={styles.moodTextStyle}>{this.props.mood.name}</Text>
        </View>
      </ImageBackground>
    );
  };
}
