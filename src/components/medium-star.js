import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import Images from '@assets/images';
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
    // TODO: replace this style with a shadowed shooting star
    // rendering a shadow on a view element is pretty inefficient
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    width: 30,
    height: 30,
    elevation: 1,
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 2,
    },
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
    let clapBubbleStyle = {
      position: 'absolute',
      opacity: this.state.fadeAnim,
    };
    let animationStyle = {
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

export default class ClapButton extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      maxCount: 25,
      claps: [],
    };
  }

  animationComplete = (countNum) => {
    let claps = this.state.claps;
    claps.splice(claps.indexOf(countNum), 1);
    this.setState({ claps });
  }

  clap = () => {
    let { count, claps, maxCount } = this.state;
    if (count <= maxCount) {
      claps.push(count);
      // push claps for current song to database
      count++;
      this.setState({ count });
    }
    // else {
    //   claps.push(maxCount);
    //   this.setState({ maxCount });
    // }
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
    return this.state.claps.map(countNum => <ClapBubble
      key={countNum}
      count={countNum}
      maxCount={maxCount}
      animationComplete={this.animationComplete.bind(this)}/>);
  }

  render = () => {
    let clapIcon = (this.state.count <= 1) ? (
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
