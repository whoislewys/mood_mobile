import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

import Images from '@assets/images';

let TimeBar = React.createClass({
  render: function() {
    let partDone = (this.props.currentTime / this.props.totalTime) * 300;

    return (
      <View style={styles.timeBar}>
        <View style={[
          {
            flex: partDone,
            height: 1,
            marginTop: 10,
            backgroundColor: '#eee'
          }
        ]}></View>
        <Image source={Images.timeBarTick} style={[
          {
            width: 2,
            height: 11,
            marginTop: 5
          }
        ]}/>
        <View style={[
          {
            flex: 300 - partDone,
            height: 1,
            marginTop: 10,
            backgroundColor: '#999'
          }
        ]}></View>
      </View>
    );
  }
});

const width = Dimensions.get('window').width;

let styles = StyleSheet.create({
  timeBar: {
    flex: 10,
    width: width * 0.8,
    marginHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row'
  }
});

export default TimeBar;
