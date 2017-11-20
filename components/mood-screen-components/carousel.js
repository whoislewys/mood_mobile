import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Animated
} from 'react-native';

import Mood from './mood';
import Images from '@assets/images';

const screenHeight = Dimensions.get('window').height;
const scrollHeight = screenHeight * 0.9;
const ITEM_HEIGHT = 180;

const yOffset = new Animated.Value(0);

Number.prototype.roundTo = function(num) {
    var resto = this%num;
    if (resto <= (num/2)) {
        return this-resto;
    } else {
        return this+num-resto;
    }
}

export default class Carousel extends React.Component {
  state = {
    moods: this.props.moods,
    offset: {x: 0, y: 0}
  }

  getMoods = () => {
    return this.state.moods.map((mood, index) => { return <Mood mood={mood} key={index} yOffset={yOffset} /> })
  }

  handleScroll = (event) => {
    let yPos = event.nativeEvent.contentOffset.y;
    let index = Math.round(yPos/ITEM_HEIGHT);
    if(index > 2) {
      let newMoods = this.state.moods.slice(index - 1).concat(this.state.moods.slice(0,index - 1));
      this.setState({moods: newMoods, offset: {x: 0, y: yPos - (ITEM_HEIGHT * 2)}});
    }
    // } else if(index < 2) {
    //   let moods = this.state.moods;
    //   let newMoods = moods.slice(moods.length - 2).concat(moods.slice(0, moods.length - 2));
    //   this.setState({moods: newMoods, offset: {x: 0, y: yPos + (ITEM_HEIGHT * 2)}});
    // }

    return Animated.event(
      [{nativeEvent: {contentOffset: {y: yOffset}}}]
    );
  }

  snap = (event) => {
    let yPos = event.nativeEvent.contentOffset.y;
    if(yPos % ITEM_HEIGHT != 0) {
      // console.log(yPos);
      // console.log(yPos.roundTo(ITEM_HEIGHT));

      this._scrollView.scrollTo({x: 0, y: yPos.roundTo(ITEM_HEIGHT), animated: false});
    }

    let index = Math.round((yPos + ITEM_HEIGHT)/ITEM_HEIGHT);
    // console.log(this.state.moods[index].name);

      fetch('http://api.moodindustries.com/api/v1/songs/?t=EXVbAWTqbGFl7BKuqUQv')
      // fetch('http://localhost:3000/api/v1/songs/?t=EXVbAWTqbGFl7BKuqUQv')
        .then((responseJson) => {
          return responseJson.json();
        })
        .then((json) => {
          let list = Object.keys(json).map(function (key) { return json[key]; });
          this.props.setPlayQueue(list);
          this.props.navigation.navigate('Play', {mood: this.state.moods[index]})
        })
        .catch((error) => {
          console.log(error);
        });

    this.props.setMood(this.state.moods[index]);
  }

  render = () => {

    return (
      <View style={{flex: 1}}>
        <Animated.ScrollView
          ref={(ref) => { this._scrollView = ref && ref._component; }}
          style={{flex: 0, height: scrollHeight}}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment={'center'}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          directionalLockEnabled={true}
          decelerationRate={'fast'}
          contentOffset={this.state.offset}
          onScroll={this.handleScroll}
          onMomentumScrollEnd={this.snap}>
          { this.getMoods() }
        </Animated.ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({

});
