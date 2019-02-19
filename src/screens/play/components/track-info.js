import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import InfoText from './info-text';
import TimeBar from './time-bar';

const styles = StyleSheet.create({
  trackInfoContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  timeBar: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  infoText: {
    flex: 1,
    paddingTop: '15%',
  },
});

export default class TrackInfo extends Component {
  render = () => (
      <View style={styles.trackInfoContainer}>
        <TimeBar setTime={this.props.setTime}/>
        <View style={styles.infoText}>
          <InfoText track={this.props.track} />
        </View>
      </View>
  )
}
