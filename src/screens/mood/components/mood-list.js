import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Images from '@assets/images';
import Mood from './mood';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 10,
    padding: 15,
    paddingTop: 45,
    alignItems: 'center',
    paddingBottom: 25,
  },
  headerContent: {
    flexDirection: 'row',
  },
  headerDivider: {
    resizeMode: 'contain',
    width: width * 0.95,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    color: '#666',
    fontSize: 32,
    fontWeight: '300',
    paddingBottom: 0,
    paddingTop: 10,
    paddingLeft: 22,
  },
  bugsButton: {
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    opacity: 0.35,
    right: 64,
    width: 26,
    height: 44,
    top: 8,
  },
  settingsButton: {
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    right: 22,
    width: 26,
    height: 44,
    top: 8,
    opacity: 0.4,

  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    height: 50,
    width: 80,
    marginTop: 10,
    marginLeft: 20,
  },
});

export default class MoodList extends React.Component {
  keyExtractor = mood => mood.name

  settings = () => {
    this.props.settings();
  }

  playscreen = () => {
    this.props.playscreen();
  }

  onPressItem = (id) => {
    console.log('id of current click: ', id);
    this.props.setMood(id);
    this.props.loadSongsForMood(id);
    this.props.playscreen(); // TODO: fix this broken navigate to playscreen
  }

  // renderItem called when rendering FlatList.
  // returns a Mood component
  _renderItem = ({ item }) => <Mood
      mood={item}
      loadSongsForMood={this.props.loadSongsForMood}
      setMood={this.props.setMood}
      playscreen={this.props.playscreen}
      selected={this.props.selected}
      id={item.id}
      onPressItem={this.onPressItem}
    />

  renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>
            Mood.
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('http://moodindustries.com/bug_reports/new')}>
            <Image source={Images.bugIcon} style={styles.bugsButton}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.settings}>
            <Image source={Images.settingsGear} style={styles.settingsButton}/>
          </TouchableOpacity>
        </View>
      </View>
  )

  // renderItem should be a function that returns a component
  render = () => (
      <FlatList
        data={this.props.moods}
        keyExtractor={this.keyExtractor}
        renderItem={this._renderItem}
        ListHeaderComponent={this.renderHeader}
        >
      </FlatList>
  )
}
