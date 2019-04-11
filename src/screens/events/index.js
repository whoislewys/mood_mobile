import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '@assets/images';
import { connect } from 'react-redux';
import EventRow from './components/event-row';
import MoodLeftHeader from '../../components/headers/MoodLeftHeader';
import { spacing } from '../../assets/styles';

const ADD_EVENT_URL = 'https://goo.gl/forms/PoVlPj9YbhVq8zTp1';

const styles = {
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addEventButton: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
  },
  addIcon: {
    height: 55,
    width: 55,
  },
  eventsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginHorizontal: spacing.sm,
  },
};

class EventsScreen extends Component {
  keyExtractor = event => event.id;

  _renderItem = ({ item }) => (
    <EventRow event={item} />
  );

  getEvents = () => (
    this.props.events.length
      ? (
        <FlatList
          data={this.props.events}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
        />
      )
      : <ActivityIndicator color="black" size="large" animating style={{ flex: 10 }} />
  );

  render = () => (
    <View style={styles.background}>
      <MoodLeftHeader title="PHX Events">
        <TouchableOpacity style={styles.addEventButton} onPress={() => Linking.openURL(ADD_EVENT_URL)}>
          <Image source={Images.addEventButton} style={styles.addIcon} />
        </TouchableOpacity>
      </MoodLeftHeader>
      <View style={styles.eventsContainer}>
        {this.getEvents()}
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  events: state.events.events,
});

export default connect(mapStateToProps)(EventsScreen);
