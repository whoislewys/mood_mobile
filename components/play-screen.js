import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Images from '@assets/images.js';
import PlayControls from './play-screen-components/play-controls';
import TrackInfo from './play-screen-components/track-info';
import Background from './background';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.03,
  },
  menuDropdown: {
    flex: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodText: {
    backgroundColor: 'transparent',
    color: 'white',
    justifyContent: 'center',
  },
  backButton: {
    width: 10,
    height: 20,
    marginTop: 15,
    marginLeft: 0.02 * width,
    resizeMode: 'stretch',
  },
});

const Playscreen = React.createClass({
  componentWillMount() {
    for (let i = 0; i < this.props.playQueue.length; i += 1) {
      const url = this.props.playQueue[i].art_url;

      const prefetchTask = Image.prefetch(url);

      prefetchTask.then(() => {
        // console.log(`✔ Prefetch OK (+${new Date() - mountTime}ms) - ${url}`);
      }, () => {
        console.log(`✘ Prefetch failed - ${this.props.playQueue[i].album_name}`);
      });
    }
  },
  navBack() {
    fetch('http://api.moodindustries.com/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
    // fetch('http://localhost:3000/api/v1/moods/?t=EXVbAWTqbGFl7BKuqUQv')
      .then((responseJson) => {
        return responseJson.json();
      })
      .then((json) => {
        let list = Object.keys(json).map(function (key) { return json[key]; });
        this.props.navigation.navigate('Mood', {moods: list})
      })
      .catch((error) => {
        console.log(error);
      });
  },
  render() {
    return (
      <Background
        image={{ uri: this.props.playQueue[this.props.currentTrack].art_url }}
        blur={50}
      >
        <View style={styles.container}>
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={this.navBack}>
              <Image source={Images.backArrow} style={styles.backButton} />
            </TouchableOpacity>
            {/* <Text style={styles.moodText}>{this.props.mood.name}</Text> */}
          </View>
          <TrackInfo
            skipForward={this.props.nextTrack}
            skipBack={this.props.previousTrack}
            track={this.props.playQueue[this.props.currentTrack]}
            duration={this.props.duration}
            currentTime={this.props.currentTime}
            setTime={this.props.setTime}
          />
          <PlayControls
            liked={this.props.liked}
            toggleLike={this.props.toggleLike}
            toggleDislike={this.props.toggleDislike}

            playing={this.props.playing}
            handlePlayPress={this.props.handlePlayPress}
          />
        </View>
      </Background>
    );
  },
});

export default Playscreen;
