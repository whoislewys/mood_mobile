import React from 'react';
import { StackNavigator } from 'react-navigation';

import PlayScreen from '../play-screen';
import MoodScreen from '../mood-screen'
import SplashScreen from '../splash-screen';

const map = (SomeComponent) => {
  return React.createClass({
    render: function() {
      const screenProps = this.props.screenProps;
      delete this.props.screenProps;
      const {navigation: {state: {params}}} = this.props
      return <SomeComponent {...params} {...this.props} {...screenProps} />
    }
  });
}

let Nav = StackNavigator({
  Splash: { screen: SplashScreen },
  Mood: { screen: map(MoodScreen) },
  Play: { screen: map(PlayScreen) },
  initialRouteName: {
    screen: SplashScreen
  }
},{
  headerMode: 'none'
});

export default React.createClass({
    render: function() {
      return <Nav screenProps={{...this.props}}/>;
    }
});
