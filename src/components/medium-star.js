import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import Images from '@assets/images';
import { incrementScore } from '../redux/modules/score';
import { fonts } from '../assets/styles';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const styles = StyleSheet.create({
  starButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: 'goldenrod',
    top: Platform.OS === 'android' ? -16 : -13,
    fontFamily: fonts.primary,
    fontSize: fonts.body,
  },
  star: {
    height: 25,
    width: 25,
    tintColor: '#fff',
  },
  shootingStar: {
    height: 30,
    width: 30,
    tintColor: '#fff',
  },
  shootingStarShadow: {
    // TODO: replace this style by using a separate png of a shooting star with baked-in drop shadow
    //  rendering a shadow on a view element is pretty inefficient
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    width: 30,
    height: 30,
  },
});

class ShootingStar extends Component {
  constructor(props) {
    super(props);
    const { x: initX, y: initY } = this.props.shootFrom;

    this.state = {
      xPosition: new Animated.Value(initX),
      yPosition: new Animated.Value(initY),
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { x: initX, y: initY } = this.props.shootFrom;
    const { spray } = this.props;

    Animated.parallel([
      Animated.timing(this.state.xPosition, {
        toValue: initX + getRndInteger(-spray, spray),
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.yPosition, {
        toValue: initY - 100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        this.props.animationComplete(this.props.count);
      }, 300);
    });
  }

  render = () => {
    const { extraStyles } = this.props;

    const clapBubbleStyle = {
      position: 'absolute',
      opacity: this.state.fadeAnim,
    };
    const animationStyle = {
      transform: [{ translateY: this.state.yPosition }, { translateX: this.state.xPosition }],
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      (this.props.count <= this.props.maxCount) ? (
        <Animated.View style={[clapBubbleStyle, animationStyle]}>
          <View style={styles.shootingStarShadow}>
            <Image source={Images.star} style={[styles.shootingStar, extraStyles]} />
          </View>
          <Text style={[styles.countText, this.props.textColor]}>{this.props.count}</Text>
        </Animated.View>
      ) : (
        <Animated.View style={[clapBubbleStyle, animationStyle]}>
          <Text style={styles.countText}>{this.props.maxCount}</Text>
        </Animated.View>
      )
    );
  }
}

export class StarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxCount: 25,
      claps: [],
    };
  }

  animationComplete = (countNum) => {
    const { claps } = this.state;
    claps.splice(claps.indexOf(countNum), 1);
    this.setState({ claps });
  };

  clap = () => {
    if (!this.props.userIsLoggedIn) {
      this.props.navigation.navigate('Login');
      return;
    }
    // start from currentScore + 1 to not show 0 stars
    const { claps, maxCount } = this.state;
    const newScore = this.props.currentScore + 1;
    if (newScore <= maxCount) {
      claps.push(newScore);
      this.props.incrementScore();
    }
  };

  keepClapping = () => {
    const clapInterval = 200; // 200ms means 25 stars takes 5 seconds
    this.clapTimer = setInterval(() => this.clap(), clapInterval); // timer takes ms argument
  };

  stopClapping = () => {
    if (this.clapTimer) {
      clearInterval(this.clapTimer);
    }
  };

  renderClaps = () => {
    const { extraStyles, ...extraProps } = this.props;
    const maxCount = 25;
    // render a clap bubble for each clapBubble in the array
    return this.state.claps.map(countNum => (
      <ShootingStar
        key={countNum}
        count={countNum}
        maxCount={maxCount}
        animationComplete={this.animationComplete}
        extraStyles={this.props.extraStyles}
        {...extraProps}
      />
    ));
  };

  render = () => {
    const { extraStyles } = this.props;

    const clapIcon = (this.props.currentScore < 1)
      ? <Image source={Images.starOutline} style={[styles.star, extraStyles]} />
      : <Image source={Images.star} style={[styles.star, extraStyles]} />;

    return (
      <View>
        <TouchableOpacity
          onPress={this.clap}
          onPressIn={this.keepClapping}
          onPressOut={this.stopClapping}
          activeOpacity={0.7}
          style={styles.starButton}
        >
          {clapIcon}
        </TouchableOpacity>
        {this.renderClaps()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentScore: state.score.currentScore,
  scoreDelta: state.score.scoreDelta,
  userIsLoggedIn: state.auth.userIsLoggedIn,
});

const mapDispatchToProps = {
  incrementScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(StarButton);
