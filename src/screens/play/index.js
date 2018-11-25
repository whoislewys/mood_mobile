import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Images from '@assets/images';
import PlayControls from './components/play-controls';
import TrackInfo from './components/track-info';
import Background from '../../components/background';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.03,
  },
  menuDropdown: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0.01 * width,
    marginRight: 0.02 * width,
    marginTop: 20,
  },
  moodText: {
    flex: 1,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#ccc',

    paddingTop: 0,
    marginTop: -4,

    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: '300',
  },
  backButton: {
    width: 23,
    height: 14,
    position: 'absolute',
    top: -7,
    left: 0.02 * width,
    opacity: 0.5,
    resizeMode: 'stretch',
    transform: [{ rotateX: '180deg' }],
  },
  touchable: {
    zIndex: 2,
  },
});

class PlayScreen extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
  }

  render = () => {
    const { goBack } = this.props.navigation;

    return (this.props.queue.length
      // return playscreen if queue has 1 or more songs
      ? (
        <Background
          image={{ uri: this.props.currentTrack.artwork }}
          blur={50}
        >
          <View style={styles.container}>
            <View style={styles.menuDropdown}>
              <TouchableOpacity onPress={() => goBack()} style={styles.touchable}>
                <Image source={Images.arrowUpWhite} style={styles.backButton} />
              </TouchableOpacity>

              <Text style={styles.moodText}>
                { this.props.selected ? this.props.selected.name.toLowerCase() : '' }
              </Text>
            </View>
            <TrackInfo
              skipForward={this.props.nextTrack}
              skipBack={this.props.previousTrack}
              track={this.props.currentTrack}
              setTime={this.props.setTime}
              currentTime={this.props.currentTime}
            />
            <PlayControls
              shuffled={this.props.shuffled}
              repeat={this.props.repeat}
              toggleShuffle={this.props.toggleShuffle}
              toggleRepeat={this.props.toggleRepeat}

              playing={this.props.playing}
              handlePlayPress={this.props.handlePlayPress}

              loading={this.props.loading}
            />
          </View>
        </Background>
      )
      // return a spinner if queue is empty
      : <ActivityIndicator color={'black'} size={'large'} animating={true} style={{ flex: 10 }}/>
    );
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  selected: state.mood.selected,
  queue: state.queue.queue,
});

export default connect(mapStateToProps)(PlayScreen);
