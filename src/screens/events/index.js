import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import EventRow from './components/event-row';
import MoodLeftHeader from '../../components/headers/MoodLeftHeader';
import { spacing } from '../../assets/styles';
import GradientButton from '../../components/GradientButton';

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
    height: 31,
    width: 79,
  },
  eventsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: spacing.md,
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
          showsVerticalScrollIndicator={false}
        />
      )
      : <ActivityIndicator color="black" size="large" animating style={{ flex: 10 }} />
  );

  render = () => (
    <View style={styles.background}>
      <MoodLeftHeader title='Phx Events'>
        {/* <GradientButton text='ADD EVENT' onPress={() => Linking.openURL(ADD_EVENT_URL)} width={90} /> */}
        <GradientButton
          text='ADD EVENT'
          onPress={() => this.props.navigation.navigate({
            routeName: 'FullScreenWebView',
            params: {
              url: 'https://goo.gl/forms/PoVlPj9YbhVq8zTp1',
            },
          })}
          width={90}
        />
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
