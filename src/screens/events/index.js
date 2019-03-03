import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Images from '@assets/images';
import { connect } from 'react-redux';
import EventRow from './components/event-row';
import Header from './components/header';

const styles = {
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 16,
    marginRight: 16,
  },
};


class EventsScreen extends Component {
  keyExtractor = event => event.id;

  _renderItem = ({ item }) => (
    <EventRow event={ item }> </EventRow>
  );

  getEvents = () => (
    this.props.events.length
      ? (
        <FlatList
          data={this.props.events}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={Header({ headerText: 'PHX Events', showLogo: false })}
        >
        </FlatList>
      )
      : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
  );

  render = () => (
    <View style={styles.background}>
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
