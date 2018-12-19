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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 21,
    marginRight: 21,
  },
};


class EventsScreen extends Component {
  keyExtractor = event => event.id;

  _renderItem = ({ item }) => <EventRow
  event={ item }
  >
    </EventRow>

  getEvents = () => {
    return (
      this.props.events.length
        ? (
          <FlatList
            data={this.props.events}
            renderItem={this._renderItem}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={Header({ headerText: 'Events', showLogo: false })}
            >
          </FlatList>
        )
        : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
    );
  }

  render = () => (
    <View style={styles.background}>
      {this.getEvents()}
    </View>
  )
}

const mapStateToProps = state => ({
  events: state.events.events,
});

export default connect(mapStateToProps)(EventsScreen);
