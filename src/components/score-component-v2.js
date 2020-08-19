import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Images from '@assets/images';
import { incrementScore, sendScore } from '../redux/modules/score-v2';
import { getCurrentTrackSelector } from '../redux/modules/queue';

// todo:
// 1. refactor scoring so that it only sends 1 score to API with NO timers
// 2. pull this branch into the bug/random-crashed3 branch and see if it fixes the random crashes anything

const styles = StyleSheet.create({
  starButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  star: {
    resizeMode: 'contain',
    height: 27,
    width: 27,
    tintColor: '#fff',
  },
});

export class HeartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxCount: 1,
    };
  }

  like = () => {
    if (!this.props.userIsLoggedIn) {
      this.props.navigation.navigate('Login');
      return;
    }
    // start from currentScore + 1 to not show 0 hearts
    const { maxCount } = this.state;
    const newScore = this.props.currentScore + 1;
    if (newScore <= maxCount) {
      this.props.incrementScore(this.props.currentScore);
      if (this.props.curTrack != null) {
        this.props.sendScore(this.props.curTrackId);
      }
    }
  };

  render = () => {
    // extraStyles can be passed down to adjust tint color
    // (white on playscreen, black on homescreen)
    const { extraStyles } = this.props;

    const heartIcon = (this.props.currentScore < 1)
      ? <Image source={Images.heartOutline} style={[styles.star, extraStyles]} />
      : <Image source={Images.heart} style={[styles.star, extraStyles]} />;

    return (
      <View testID='StarTouchableContainer'>
        <TouchableOpacity
          accessible={false}
          testID='StartTouchable'
          onPress={this.like}
          activeOpacity={0.7}
          style={styles.starButton}
        >
          {heartIcon}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentScore: state.score.currentScore,
  curTrack: getCurrentTrackSelector(state),
  curTrackId: state.queue.curTrackId,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  incrementScore,
  sendScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeartButton);
