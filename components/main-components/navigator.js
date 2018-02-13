import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import NavigationStack from './navigation-stack';

class Navigator extends Component {
  render = () => {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigationStack
        screenProps={{...this.props}}
        navigation={addNavigationHelpers({ dispatch, state: navigationState })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.NavigationReducer
  };
};

export default connect(mapStateToProps)(Navigator);
