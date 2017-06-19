import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
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
  dropdownButton: {
    width: 20,
    height: 10,
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
  render() {
    return (
      <Background
        image={{ uri: this.props.playQueue[this.props.currentTrack].art_url }}
        blur={50}
      >
        <View style={styles.container}>
          <View style={styles.menuDropdown}>
            <TouchableHighlight>
              <Image source={Images.dropdownArrow} style={styles.dropdownButton} />
            </TouchableHighlight>
            {/* <Text style={styles.moodText}>{this.props.mood.name}</Text> */}
          </View>
          <TrackInfo
            skipForward={this.props.nextTrack}
            skipBack={this.props.previousTrack}
            track={this.props.playQueue[this.props.currentTrack]}
            duration={this.props.duration}
            currentTime={this.props.currentTime}
            setTime={this.setTime}
          />
          <PlayControls
            add={this.props.added}
            toggleAdd={this.props.toggleAdd}

            shuffle={this.props.shuffle}
            toggleShuffle={this.props.toggleShuffle}

            repeat={this.props.repeat}
            toggleRepeat={this.props.toggleRepeat}

            more={this.props.more}
            toggleMore={this.props.toggleMore}

            playing={this.props.playing}
            handlePlayPress={this.props.handlePlayPress}
          />
        </View>
      </Background>
    );
  },
});

export default Playscreen;
