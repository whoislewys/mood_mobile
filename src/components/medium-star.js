import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import Images from '@assets/images';
import { incrementScore, incrementScoreDelta } from '../redux/modules/score';
import { fonts } from '../assets/styles';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const styles = StyleSheet.create({
  clapButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clapText: {
    color: 'white',
    top: -13,
    fontFamily: fonts.primary,
    fontSize: fonts.body,
  },
  star: {
    height: 25,
    width: 25,
  },
  shootingStar: {
    height: 30,
    width: 30,
  },
  shootingStarShadow: {
    // TODO: replace this style by using a separate png of a shooting star with baked-in drop shadow
    // rendering a shadow on a view element is pretty inefficient
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    width: 30,
    height: 30,
  },
});

class ClapBubble extends Component {
  constructor() {
    super();
    this.state = {
      yPosition: new Animated.Value(0),
      xPosition: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
      maxCount: 25,
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.yPosition, {
        toValue: -100,
        duration: 500,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 420,
      }),
      Animated.timing(this.state.xPosition, {
        toValue: getRndInteger(-23, 23),
        duration: 500,
      }),
    ]).start(() => {
      setTimeout(() => {
        this.props.animationComplete(this.props.count);
      }, 300);
    });
  }

  render = () => {
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
            <Image source={Images.star} style={styles.shootingStar}/>
          </View>
          <Text style={styles.clapText}>{this.props.count}</Text>
        </Animated.View>
      ) : (
        <Animated.View style={[clapBubbleStyle, animationStyle]}>
          <Text style={styles.clapText}>{this.props.maxCount}</Text>
        </Animated.View>
      )
    );
  }
}

class ClapButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxCount: 25,
      claps: [],
    };
  }

  animationComplete = (countNum) => {
    const claps = this.state.claps;
    claps.splice(claps.indexOf(countNum), 1);
    this.setState({ claps });
  }

  clap = () => {
    // start from currentScore + 1 to not show 0 stars
    const { claps, maxCount } = this.state;
    const newScore = this.props.currentScore + 1;
    if (newScore <= maxCount) {
      // option 1: push claps for current song to database/ API call HERE
      claps.push(newScore);
      this.props.incrementScore();
    }
  }

  keepClapping = () => {
    const clapInterval = 200; // 200 -> 25 stars takes 5 seconds
    this.clapTimer = setInterval(() => this.clap(), clapInterval); // timer takes ms argument
  }

  stopClapping = () => {
    if (this.clapTimer) {
      clearInterval(this.clapTimer);
    }
  }

  renderClaps = () => {
    const maxCount = 25;
    // render a clap bubble for each clapBubble in the array
    return this.state.claps.map(countNum => (
      <ClapBubble
        key={countNum}
        count={countNum}
        maxCount={maxCount}
        animationComplete={this.animationComplete.bind(this)}
      />
    ));
  }

  render = () => {
    const clapIcon = (this.props.currentScore < 1) ? (
      <Image source={Images.starOutline} style={styles.star}/>
    )
      : <Image source={Images.star} style={styles.star}/>;

    return (
      <View>
        <TouchableOpacity
        onPress={this.clap.bind(this)}
        onPressIn={this.keepClapping.bind(this)}
        onPressOut={this.stopClapping.bind(this)}
        activeOpacity={0.7}
        style={styles.clapButton}>
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
});

const mapDispatchToProps = {
  incrementScore,
  incrementScoreDelta,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClapButton);
