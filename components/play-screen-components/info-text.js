import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;

let InfoText = React.createClass({
  render: function() {
    let album = this.props.track;

    return (
      <View style={styles.albumInfoText}>
        <Text
          style={styles.albumInfoMain}
          numberOfLines={1}
          ellipsizeMode="tail"
          >
          { album.name }
        </Text>
        <View style={styles.albumInfoSubRow}>
          <Text
            style={[styles.albumInfoSubText, {
              maxWidth: width * 0.45
            }]}
            numberOfLines={1}
            ellipsizeMode="tail"
            >
            { album.artist }
          </Text>
          <Text style={[styles.albumInfoSubText, {
            marginHorizontal: 2
          }]}>
            -
          </Text>
          <Text
            style={[styles.albumInfoSubText, {
              maxWidth: width * 0.45
            }]}
            numberOfLines={1}
            ellipsizeMode="tail"
            >
            { album.album_name }
          </Text>
        </View>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  albumInfoText: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  albumInfoMain: {
    color: '#ddd',
    maxWidth: width * 0.5,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  albumInfoSubRow: {
    flexDirection: 'row'
  },
  albumInfoSubText: {
    color: '#ddd',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300'
  }
});

export default InfoText;
