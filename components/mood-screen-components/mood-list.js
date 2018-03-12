import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import Images from '@assets/images.js';
import Mood from './mood';
const width = Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 10,
    padding: 15,
    paddingTop: 35,
    alignItems: 'center'
  },
  headerContent: {
    flexDirection: 'row'
  },
  headerDivider: {
    resizeMode: 'contain',
    width: width * 0.95
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: 32,
    fontWeight: '300',
    paddingBottom: 25,
    paddingTop: 10
  },
  bugsButton: {
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    opacity: 0.4,
    right: 56,
    width: 26,
    height: 45,
    top: 8
  },
  settingsButton: {
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15,
    width: 26,
    top: 8
  },
});

export default class MoodList extends React.Component {
  _keyExtractor = (mood, index) => {
    return index;
  }

  _renderItem = ({item, index}) => {
    return <Mood
      mood={item}
      key={index}
      setMood={this.props.setMood}
      selected={this.props.selected}
      id={index}
    />
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>
            {/* how do you feel? */}
          </Text>
          <TouchableOpacity onPress={this._settings}>
            <Image source={Images.bugIcon} style={styles.bugsButton}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._settings}>
            <Image source={Images.settingsGear} style={styles.settingsButton}/>
          </TouchableOpacity>
        </View>
        {/* <Image source={Images.headerDivider} style={styles.headerDivider}/> */}
      </View>
    );
  }

  _settings = () => {
    console.log('Linked');
    this.props.navigate();
  }

  render = () => {
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
  }
}
