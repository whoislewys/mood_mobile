import React from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import MoodList from './mood-screen-components/mood-list';
import MoodListItem from './mood-screen-components/mood-list-item';
import Background from './background';

import Images from '@assets/images';
import Moods from '@assets/moods';

let MoodScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Background image={Images.moodBackground} overlay={Images.moodBackgroundOverlay}>
          <View style={styles.header}>
            <Image style={styles.headerImage} source={Images.moodHeader}>
              <Image style={styles.logo} source={Images.moodLogo}></Image>
            </Image>
          </View>
          <View style={styles.body}>
            <MoodList play={this.props.play}/>
          </View>
        </Background>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 17,
    position: 'relative',
  },
  headerImage: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: null,
    height: null,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  body: {
    flex: 83,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 60,
    resizeMode: 'contain',
    marginBottom: 15
  }
});

export default MoodScreen;
