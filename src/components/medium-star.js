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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const styles = StyleSheet.create({
  clapButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clapText: {
    color: 'white',
    fontSize: 12,
  },
  star: {
    height: 25,
    width: 25,
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
        toValue: -120,
        duration: 500,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 450,
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
      backgroundColor: 'transparent',
      opacity: this.state.fadeAnim,
      justifyContent: 'center',
      alignItems: 'center',
    };
    let animationStyle = {
      transform: [{ translateY: this.state.yPosition }, { translateX: this.state.xPosition }],
    };

    return (
      (this.props.count <= this.props.maxCount) ? (
      <Animated.View style={[clapBubbleStyle, animationStyle]}>
        <Image source={Images.star} style={{ top: 18.7 }}/>
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
    this.clapTimer = setInterval(() => this.clap(), 150);
  }

  stopClapping = () => {
    if (this.clapTimer) {
      clearInterval(this.clapTimer);
    }
  }

  renderClaps = () => {
    const maxCount = 25;
    // TODO: make stars keep shooting up if maxCount is reached.
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
