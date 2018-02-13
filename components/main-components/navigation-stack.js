import React from 'react';
import { StackNavigator } from 'react-navigation';

import PlayScreen from '../play-screen';
import MoodScreen from '../mood-screen'
import SplashScreen from '../splash-screen';
import SettingsScreen from '../settings-screen';

const map = (SomeComponent) => {
  return class SomeClass extends React.Component {
    render = () => {
      const screenProps = this.props.screenProps;
      delete this.props.screenProps;
      const {navigation: {state: {params}}} = this.props
      return <SomeComponent {...params} {...this.props} {...screenProps} />
    }
  }
}

export default NavigationStack = StackNavigator({
  Splash: { screen: SplashScreen },
  Mood: { screen: map(MoodScreen) },
  Play: { screen: map(PlayScreen) },
  Settings: { screen: map(SettingsScreen) }
},{
  headerMode: 'none'
});
