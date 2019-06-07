import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    marginBottom: 4,
  },
  moodArt: {
    resizeMode: 'contain',
    width: width * 0.49,
    height: width * 0.49,
    justifyContent: 'center',
  },
  featuredTile: {
    resizeMode: 'stretch',
    width: width * 0.409,
    height: width * 0.409,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginTop: '-4.9%',
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

  getMoodTileImage = (id) => {
    if (id === tileConstants.MYSTERY) {
      return <Image style={styles.moodArt} source={this.props.mood.file} />;
    }
    if (id === tileConstants.FEATURED_SONG) {
      return this.props.mood.file
        ? (
          <View style={styles.moodArt}>
            <ImageBackground style={styles.featuredTile} source={{ uri: this.props.mood.file }}>
              <View style={styles.subTextContainer}>
                <Text style={styles.textStyle}>Song of the Week</Text>
              </View>
            </ImageBackground>
          </View>
        )
        : null;
    }
    return <Image style={styles.moodArt} source={{ uri: this.props.mood.file }} />;
  };
}
