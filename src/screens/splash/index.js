import React, { Component } from 'react';
import {
  View,
  NetInfo,
  Linking,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { loadMoods } from '../../redux/modules/mood';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internetCheck: null,
    };
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  }

  navigate = async (url) => {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const urlArray = route.split('/');
    const routeName = urlArray[0];
    console.log('url split array: ', urlArray);
    // ex url: moodmusic://play/mood/id/artist/album/artwork/title/url
    if (routeName === 'play') {
      const baggtrack = {
        album: 'The Holy & The Hostile ',
        artist: 'Lunchbagg',
        artwork: 'https://i1.sndcdn.com/artworks-000204149024-2spro2-t500x500.jpg',
        id: '67',
        mood_id: 5,
        title: 'Best Friend (Video in Description)',
        url: 'https://mood-music-api.herokuapp.com//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7f380f375f25d33c28b504a15607408b5d98bb38/song40.mp3',
      };
      // func to load songs for mood into queue: this.props.loadSongsForMoodId(moodObj.id);
      // func to add track into queue: handleShare(<track object>)
      // structure for track object:
      // id: t.id.toString(),
      // url: t.file,
      // title: t.name,
      // artist: t.artist
      // album: t.album_name,
      // artwork: t.art_url,
      // mood_id: t.mood_id,
      this.props.loadSongsForMoodId(parseInt(id, 10));
      await this.props.handleShare(baggtrack);
      navigate({ routeName: 'Play', params: { visible: false } });
    }
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      // for android deep linking
      // immediately navigate to url
      this.props.loadMoods();
      Linking.getInitialURL().then((url) => {
        this.navigate(url);
      });
    } else {
      this.props.loadMoods();
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount = () => {
    Linking.removeEventsListener('url', this.handleOpenURL);
  }

  shouldComponentUpdate = () => {
    let shouldUpdate = true;
    if (this.props.moods != null && this.props.moods.length > 0) {
      shouldUpdate = false;
    }
    return shouldUpdate;
  }

  componentDidUpdate = () => {
    if (this.props.moods.length > 0) {
      this.navigateToMoodScreen();
    }
  }

  handleConnectivityChange = (isConnected) => {
    if (!isConnected) {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this.handleConnectivityChange,
      );

      this.props.stopPlayback();
      this.navigateToErrorScreen();
    }
  }

  navigateToMoodScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Mood',
      params: { ...params, visible: true },
    });
  };

  navigateToErrorScreen = (params) => {
    this.props.navigation.navigate({
      routeName: 'Error',
      params: { ...params },
    });
  };

  render = () => (<View style={{ flex: 1 }}></View>)
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  loading: state.mood.loading,
  error: state.mood.error,
});

const mapDispatchToProps = {
  loadMoods,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
