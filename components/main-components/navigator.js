import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import NavigationStack from './navigation-stack';
import appReducer from '../redux/reducers/reducers';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

class Navigator extends Component {
  render = () => {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigationStack
        screenProps={{...this.props}}
        navigation={ addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav,
                        addListener,
                      })
                    }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(Navigator);

function configureStore() {
  const store = createStore(
    appReducer,
    applyMiddleware(middleware),
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = combineReducers(require('../redux/reducers/reducers'));
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default class extends React.Component {
  state = {
    store: configureStore()
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <AppWithNavigationState {...this.props} />
      </Provider>
    );
  }
}
